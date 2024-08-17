import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Category } from "../models/category.model.js"
import nodemailer from "nodemailer";




const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'hubwhisper@gmail.com',
            pass: 'kdxhvzjikivwqhmp'
        }
    }
);

const generateAccessAndRefereshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) throw new Error("Invalid")
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        console.log("access token in func:",accessToken)
        return {accessToken , refreshToken}

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access tokens")
    }
}

const registerUser = asyncHandler(async (req, res, next) => {
    try {
      const { username, email, password, bio } = req.body;
  
      // Validate required fields
      if ([username, email, password].some((field) => !field || field.trim() === "")) {
        return res.status(400).json({ message: "All required fields must be filled." });
      }
  
      if (!req.files || !req.files.avatar) {
        return res.status(400).json({ message: "Avatar is required." });
      }
  
      const avatarLocalPath = req.files.avatar[0].path;
      const coverImageLocalPath = req.files.coverImage ? req.files.coverImage[0].path : null;
  
      const avatar = await uploadOnCloudinary(avatarLocalPath);
      if (!avatar) {
        throw new Error("Failed to upload avatar.");
      }
  
      let coverImage = null;
      if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
        if (!coverImage) {
          throw new Error("Failed to upload cover image.");
        }
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists." });
      }
  
      const user = await User.create({
        username,
        email,
        password,
        bio,
        avatar: avatar.secure_url,
        coverImage: coverImage ? coverImage.secure_url : null,
      });
  
      res.status(201).json({ message: "User registered successfully.", user });
    } catch (error) {
      console.error("Error during user registration:", error.message);
      res.status(500).json({ message: error.message || "Internal Server Error." });
    }
  });
  
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    if(!password){
        throw new ApiError(400, "Password is required")
    }
    if(!email){
        throw new ApiError(400, "Email is required")
    }

    const existedUser = await User.findOne({
        email
    })

    if(!existedUser){
        throw new ApiError(400,"User doesnot exist")
    }

    const isPasswordValid = await existedUser.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(existedUser._id)
    console.log("access token")
    console.log(accessToken)
    console.log("refresh token:")
    console.log(refreshToken)
    const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User loggedIn successfully"
        )
    )
})

const logOutUser = asyncHandler(async(req, res) => {
    console.log("req user:",req.user)
    // const {user}=req.body
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true
    }
    
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async(req, res) => { 
    const incomingRefreshtoken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshtoken){
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = User.findById(decodedToken?._id)
        
        if(!user){
            throw new ApiError(401, "Invalid RefreshToken")
        }
    
        if(incomingRefreshtoken !== user.refreshToken){
            throw new ApiError(401, "refreshToken is expired or used")
        }
    
        const options = {
            httpOnly: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccessAndRefereshTokens(user._id)
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newrefreshToken},
                "Acccess token Refreshed"
    
            )
        )
    } 
    catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})


const addLikedCategories = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    let categoryIds = req.body.categoryIds;

    console.log(categoryIds);

    categoryIds = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    console.log(categoryIds);

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

    return res.status(200).json(new ApiResponse(200, user.likedCategories, "Categories added to liked categories"));
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

    return res.status(200).json(new ApiResponse(200, user.likedCategories, "Category removed from liked categories"));
});

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
        throw new ApiError(500, "Something unexpected occurred while fetching user details");
    }
});

const editUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { userName, email, password, bio } = req.body;

    if ([userName, email, password, bio].some(field => field && field.trim() === "")) {
        throw new ApiError(400, "Please provide necessary details");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found or there was an error in finding the user");
    }

    if (userName) {
        user.userName = userName;
    }
    if (email) {
        user.email = email;
    }
    if (bio) {
        user.bio = bio;
    }
    if (password) {
        user.password = password;
    }

    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
    }

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (avatarLocalPath) {
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar) {
            throw new ApiError(500, "Failed to upload avatar");
        }
        user.avatar = avatar.url;
    }

    if (coverImageLocalPath) {
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        if (!coverImage) {
            throw new ApiError(500, "Failed to upload cover image");
        }
        user.coverImage = coverImage.url;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

// const updateUserName = () => {
//     const userId = req.params;
//     const {userName} = req.body

//     if(userName)
// }

const updateCurrentPassword = asyncHandler(async(req , res) => {
    const {userId} = req.params;
    const { Password, newPassword } = req.body;
    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(Password);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Incorrect old Password")
    }
    user.password = newPassword

    await user.save({validateBeforeSave: false});

    return res.status(200).json(new ApiResponse(200, {}, "Password updated successfully"))
})

const ChangeCurrentEmail = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { email, newEmail } = req.body;

    try {
        const user = await User.findById(userId);
        console.log(user)
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (email !== user.email) {
            throw new ApiError(400, "Email does not match");
        }

        user.email = newEmail;
        await user.save(); // Save the updated email

        const currentUser = await User.findById(userId).select("-password -refreshToken");

        return res.status(200).json(new ApiResponse(200, currentUser, "Email changed Successfully"));
    } catch (error) {
        console.error("Error in ChangeCurrentEmail:", error); // Log the actual error
        throw new ApiError(500, "Error changing Email", error.message);
    }
});

const forgetPassword = asyncHandler(async (req, res) => {
    console.log('hii');

    const { email } = req.body;

    // Finding the user by email
    const user = await User.findOne({ email });

    // If user is not found, throw an error
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generate access token
    const { accessToken } = await generateAccessAndRefereshTokens(user._id);
    console.log('accesstoken in forget password', accessToken);

    // Check if access token was generated successfully
    if (!accessToken) {
        throw new ApiError(500, "Failed to generate access token");
    }

    // Construct the reset link
    const resetlink = `${process.env.CLIENT_URL}reset-password/${accessToken}`;
    console.log('Reset link:', resetlink);

    // Email options
    const mailOptions = {
        from: 'hubwhisper@gmail.com',
        to: email,
        subject: 'Here is your password Reset link for Banter.com',
        text: `Please use this link to reset your password: ${resetlink}`
    };

    // Sending the email using async/await
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({
            message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw new ApiError(500, 'Error in sending mail', error.message);
    }
});
const resetPassword = asyncHandler(async (req, res) => {
    try {
      const { resetlink, newPassword } = req.body;
  
      if (!resetlink) {
        throw new ApiError(401, "Authentication error: reset link is missing.");
      }
  
      console.log("Searching for user with reset link:", resetlink);
  
      const user = await User.findOneAndUpdate(
        { resetlink:resetlink },
        {
          password: newPassword,
          resetlink: ""
        },
        { new: true } // returns the updated document
      );
  
      if (!user) {
        throw new ApiError(404, "User not found or reset link invalid.");
      }
  
      console.log("User found and password updated:", user);
  
      return res.status(200).json(
        new ApiResponse(200, user, "Password reset successful")
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json(new ApiError(500, "Error resetting password", error.message));
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
    editUser,
    updateCurrentPassword,
    ChangeCurrentEmail,
    forgetPassword,
    resetPassword
}