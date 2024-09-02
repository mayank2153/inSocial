import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import avatar1 from "./avatar/avatar-1.webp";
import avatar2 from "./avatar/avatar-2.webp";
import avatar3 from "./avatar/avatar-3.webp";
import avatar4 from "./avatar/avatar-4.jpeg";
import logo from "../../assets/images/logo.jpg";
import logo_img_black from "../../assets/images/logo_img_black.png"
import { FaSyncAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../api/sendOtp";
import usernameGenerator from "../../api/usernameGenerator.js";
import ClipLoader from "react-spinners/ClipLoader.js";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const predefinedAvatars = [avatar1, avatar2, avatar3, avatar4];


const TwoStepForm = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const tempUserData = useSelector((state) => state.auth.tempUserData);


  const [step, setStep] = useState(1);
  const[Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(tempUserData || {
    email: "",
    userName: "",
    password: "",
    bio: "",
    avatar: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [serverError, setServerError] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Updated to handle file type
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }

    if (!formData.userName) {
      formErrors.userName = "Username is required";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    if(!formData.avatar){
      formData.avatar = "Please Upload avatar"
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const uniqueUsername = async () => {
    try {
      const username = await usernameGenerator();
      setFormData((prevData) => ({
        ...prevData,
        userName: username,
      }));
    } catch (error) {
      console.error("Error generating unique username:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const signUpData = {
        ...formData,
        avatar: selectedAvatar || formData.avatar,
      };
      await sendOtp(formData.email,'registration')
      setLoading(false);
      navigate("/verifyEmail", { state: signUpData });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setServerError(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setServerError("Failed to connect to the server. Please try again.");
      }
    }
  };

  const nextStep = () => {
    if (validateForm()) setStep(2);
  };

  const prevStep = () => setStep(1);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleAvatarSelect = async (avatarUrl) => {
    
    const avatarFile = await convertUrlToFile(avatarUrl, "avatar.png");
    
    setSelectedAvatar(avatarFile);
    setPreview(avatarUrl);
  };

  const convertUrlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  return (
    <div className="flex items-center  flex-col lg:flex-row lg:justify-evenly min-h-screen bg-black w-full max-w-screen-2xl px-10">
      <div className="mt-14 hidden lg:block">
                <img src={logo} alt="logo.png"/>
            </div>
            <div className="mt-10 block lg:hidden w-20 mb-20">
                <img src={logo_img_black} alt="logo.png"/>
            </div>

      <div className="bg-black shadow-xl rounded-lg w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl text-white font-mono  lg:ml-2">
          Create Your Account
        </h2>
        {serverError && (
          <p className="text-red-500 text-sm text-center mb-4">{serverError}</p>
        )}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-white font-semibold mt-10 pb-2 ml-4">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pl-2 mt-2">
                    *{errors.email}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="mb-4 mt-4">
                <label className="block text-white ml-4">Username *</label>
                <div className="flex items-center bg-white rounded-full focus-within:ring-2   focus-within:ring-blue-500 " >
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-full focus:outline-none "
                    required
                  />
                  <button
                    type="button"
                    onClick={uniqueUsername}
                    className="px-4 py-2 ml-2  text-grey-600 rounded-full "
                  >
                    <FaSyncAlt />
                  </button>
                </div>
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userName}
                  </p>
                )}
              </div>


              {/* Password */}
              <div className="mb-4">
                <label className="block text-white ml-4">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border mt-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-white ml-4 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-slate-200 my-1 font-mono">Already have an Account?
                  <Link to="/login">
                  <span className="cursor-pointer text-blue-600 font-mono">Login</span>
                  </Link>
                   </p>
              {/* Next Step Button */}
              <div className="flex justify-end">
                
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 w-[100px] h-[40px] text-white pt-[2px] mt-6 rounded-full text-lg font-mono hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Predefined Avatars */}
              <div className="mb-4 mt-4">
                <label className="block text-white">Choose an Avatar</label>
                <div className="flex space-x-4 mt-2">
                  {predefinedAvatars.map((avatarUrl) => (
                    <img
                      key={avatarUrl}
                      src={avatarUrl}
                      alt="Predefined Avatar"
                      className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                        selectedAvatar === avatarUrl
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleAvatarSelect(avatarUrl)}
                    />
                  ))}
                </div>
              </div>

              {/* Upload Custom Avatar */}
              <div className="mb-4 mt-4">
                <label className="block text-white">
                  Or Upload Your Own Avatar
                </label>
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-black cursor-pointer mt-2">
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer w-full h-full"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Selected Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full">
                        <FaEdit className="text-gray-500 text-2xl" />
                      </div>
                    )}
                    <input
                      type="file"
                      id="avatar-upload"
                      name="avatar"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {
                  errors.avatar && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.avatar}
                    </p>
                  )
                }
              </div>

              {/* Previous and Submit Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 w-[100px] h-[40px] text-white rounded-full mt-6 text-lg font-mono hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 w-[100px] h-[40px] text-white pt-[2px] mt-6 rounded-full text-lg font-mono hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Loading ? <ClipLoader color="#ffffff" size={20} className="mt-1"/> :'Submit'}
                </button>
              </div>

              {/* Login Redirect */}
              <p className="text-center text-white mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default TwoStepForm;

