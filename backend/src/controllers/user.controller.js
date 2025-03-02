import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js";
import mailSender from "../utils/mailSender.js";
import otpGenerator from "otp-generator";
import { OTP } from "../models/otp.model.js";
import PasswordSuccessfullyChanged from "../Template/changePassword.template.js";
import PasswordResetTemplate from "../Template/PasswordReset.template.js";
import {
  RegisterValidator,
  LoginValidator,
} from "../utils/validators/auth.validator.js";
import EmailConfirmationTemplate from "../Template/emailConfirmation.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("Invalid");
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access tokens",
    );
  }
};

/**
 * @description Registers a new user
 * @param {string} email
 * @param {string} password
 * @param {string} username
 *
 * @return {link} confirmationLink for the new user
 *
 * @author RahulBhardwaj
 */

const registerUser = asyncHandler(async (req, res, next) => {
  const isValidData = RegisterValidator.safeParse(req.body);
  if (!isValidData.success) {
    throw new ApiError(400, isValidData.error.errors[0].message);
  }

  const registeredUser = new User({
    email: isValidData.data.email,
    userName: isValidData.data.username,
    password: isValidData.data.password,
  });

  await registeredUser.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered Successfully"));
});

/**
 * @description for user login
 * @param {string}  email or username
 * @param {string} password
 *
 * @return {object} user, accessToken, refreshToken
 * @author RahulBhardwaj
 */
const loginUser = asyncHandler(async (req, res) => {
  const isValidData = LoginValidator.safeParse(req.body);
  if (!isValidData.success) {
    res
      .status(404)
      .json(new ApiResponse(404, isValidData.error.errors[0].message));
  }

  const existedUser = await User.findOne({
    $or: [
      { email: isValidData.data.email },
      { userName: isValidData.data.username },
    ],
  }).lean();

  if (!existedUser) {
    res.status(404).json(new ApiResponse(404, "User not found"));
    return;
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    res.status(401).json(new ApiResponse(401, "Invalid Password"));
    return;
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    existedUser._id,
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken",
  );

  const accessTokenoptions = {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: "none",
    secure: true,
  };

  const refreshTokenOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessTokenoptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, "User loggedIn successfully"));
});

/**
 * @description for logging out user clears tokens from cookies
 *
 * @author RahulBhardwaj
 */
const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshtoken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshtoken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid RefreshToken");
    }

    if (incomingRefreshtoken !== user.refreshToken) {
      throw new ApiError(401, "refreshToken is expired or used");
    }

    const options = {
      httpOnly: true,
    };

    const { accessToken, newrefreshToken } =
      await generateAccessAndRefereshTokens(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(new ApiResponse(200, "Acccess token Refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

const addLikedCategories = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  let categoryIds = req.body.categoryIds;

  categoryIds = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    throw new ApiError(400, "Please provide an array of category IDs");
  }

  const user = await User.findById(userId);

  for (let categoryId of categoryIds) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new ApiError(404, `Category not found: ${categoryId}`);
    }

    if (!user.likedCategories.includes(categoryId)) {
      user.likedCategories.push(categoryId);
    }
  }

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.likedCategories,
        "Categories added to liked categories",
      ),
    );
});

const removeLikedCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const categoryId = req.body.categoryId;

  const user = await User.findById(userId);

  if (!user.likedCategories.includes(categoryId)) {
    throw new ApiError(400, "Category not liked");
  }

  user.likedCategories.pull(categoryId);
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.likedCategories,
        "Category removed from liked categories",
      ),
    );
});

/**
 * @description Used to fetch user by userID
 *
 * @param {String} userId
 * @returns {Object} user
 *
 * @author RahulBhardwaj
 */
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, user, "User found"));
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new ApiError(500, "Server Error");
  }
});

/**
 * @description Used to update the current password of the user
 *
 * @param {string} userId
 * takes current password and new password as input
 *
 * @author RahulBhardwaj
 */
const updateCurrentPassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect old currentPassword");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

// const UploadCoverImage = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   // Check if cover image exists in the request
//   const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

//   if (!coverImageLocalPath) {
//     throw new ApiError(404, "Cover Image not found");
//   }

//   // Find the user by ID
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new ApiError(404, "User Not Found");
//   }

//   // Upload image to Cloudinary
//   let coverImage;
//   if (coverImageLocalPath) {
//     coverImage = await uploadOnCloudinary(coverImageLocalPath);
//     if (!coverImage) {
//       throw new ApiError(500, "Failed to upload cover image."); // Changed status code to 500 for server error
//     }
//   }

//   // Update user document with the new cover image URL
//   user.coverImage = coverImage.secure_url;
//   await user.save();

//   // Return success response
//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Cover Image uploaded successfully"));
// });

// const EditAvatar = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   // Check if cover image exists in the request
//   const avatarLocalPath = req.files?.avatar?.[0]?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(404, "Avatar not found");
//   }

//   // Find the user by ID
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new ApiError(404, "User Not Found");
//   }

//   // Upload image to Cloudinary
//   let avatar;
//   if (avatarLocalPath) {
//     avatar = await uploadOnCloudinary(avatarLocalPath);
//     if (!avatar) {
//       throw new ApiError(500, "Failed to upload Avatar."); // Changed status code to 500 for server error
//     }
//   }

//   // Update user document with the new cover image URL
//   user.avatar = avatar.secure_url;
//   await user.save();

//   // Return success response
//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Avatar uploaded successfully"));
// });

const ChangeCurrentEmail = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { email, newEmail, otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (email !== user.email) {
      throw new ApiError(400, "Email does not match");
    }

    const response = await OTP.find({ email: newEmail })
      .sort({ createdAt: -1 })
      .limit(1);
    if (response.length === 0) {
      throw new ApiError(400, "Invalid OTP");
    } else if (otp !== response[0].otp) {
      throw new ApiError(400, "Invalid OTP");
    }
    user.email = newEmail;
    await user.save();

    const currentUser = await User.findById(userId).select(
      "-password -refreshToken",
    );

    return res
      .status(200)
      .json(new ApiResponse(200, currentUser, "Email changed Successfully"));
  } catch (error) {
    console.error("Error in ChangeCurrentEmail:", error); // Log the actual error
    throw new ApiError(500, "Error changing Email", error.message);
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { accessToken } = await generateAccessAndRefereshTokens(user._id);
  if (!accessToken) {
    throw new ApiError(500, "Failed to generate access token");
  }

  const resetlink = `${process.env.CLIENT_URL}reset-password/${accessToken}`;
  user.resetlink = accessToken;
  await user.save({ validateBeforeSave: false });

  try {
    await mailSender(
      email,
      "Password Reset Link",
      PasswordResetTemplate(resetlink),
    );
  } catch (error) {
    throw new ApiError(404, "Unexpected Error");
  }

  return res.status(200).json(new ApiResponse(200, "Email sent successfully"));
});

import bcrypt from "bcrypt";

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { resetlink, newPassword } = req.body;

    if (!resetlink) {
      throw new ApiError(401, "Authentication error: reset link is missing.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { resetlink: resetlink },
      {
        password: hashedPassword, // Update with hashed password
        resetlink: "",
      },
      { new: true }, // returns the updated document
    );

    if (!user) {
      throw new ApiError(404, "User not found or reset link invalid.");
    }

    const mailContent = await mailSender(
      user.email,
      "Password Reset Successful",
      PasswordSuccessfullyChanged(),
    );

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Password reset successful"));
  } catch (error) {
    throw new ApiError(500, "Server Error");
  }
});

const sendOtp = asyncHandler(async (req, res) => {
  try {
    const { email, scenario } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw new ApiError(404, "User is already registered");
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Check if OTP already exists
    const existingOtp = await OTP.findOne({ otp });

    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    const otpPayload = { email, otp, scenario };
    const otpBody = await OTP.create(otpPayload);
    res
      .status(200)
      .json(new ApiResponse(200, otpBody, "OTP sent successfully"));
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new ApiError(500, "Error sending OTP", error.message);
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, "Token is required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.id;

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User is already verified"));
    }

    user.isVerified = true;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User verified successfully"));
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    }
    throw new ApiError(500, "Internal server error");
  }
});

export {
  registerUser,
  loginUser,
  logOutUser,
  generateAccessAndRefereshTokens,
  refreshAccessToken,
  addLikedCategories,
  removeLikedCategory,
  getUserById,
  updateCurrentPassword,
  ChangeCurrentEmail,
  forgetPassword,
  resetPassword,
  sendOtp,
  UploadCoverImage,
  EditAvatar,
  verifyUser,
};
