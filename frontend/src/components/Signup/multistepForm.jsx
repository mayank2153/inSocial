import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import avatar1 from "./avatar/avatar-1.webp"
import avatar2 from "./avatar/avatar-2.webp"
import avatar3 from "./avatar/avatar-3.webp"
import avatar4 from "./avatar/avatar-4.jpeg"
import { FaEdit } from "react-icons/fa";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const predefinedAvatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
];

const TwoStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
  const [selectedAvatar, setSelectedAvatar] = useState(""); // New state for selecting predefined avatar
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

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (selectedAvatar) {
        data.append("avatar", selectedAvatar);  // Append selected avatar if chosen
      }

      const response = await axios.post(`${url}users/register`, data);
      navigate("/login");
    } catch (error) {
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

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setPreview(avatarUrl);
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-black w-full">
      <div className="bg-black shadow-xl rounded-lg p-8 w-full max-w-md mr-40">
        <h2 className="text-2xl text-white font-mono  mt-10 ml-16">
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
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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

              {/* Next Step Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-500 w-[100px] h-[40px] text-white pt-[2px]  mt-6 rounded-full text-lg font-mono hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                selectedAvatar === avatarUrl ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => handleAvatarSelect(avatarUrl)}
            />
          ))}
        </div>
      </div>

      {/* Upload Custom Avatar */}
      <div className="mb-4 mt-4">
        <label className="block text-white">Or Upload Your Own Avatar</label>
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-black cursor-pointer mt-2">
          <label htmlFor="avatar-upload" className="cursor-pointer w-full h-full">
            {preview ? (
              <img
                src={preview}
                alt="Avatar Preview"
                className="block w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white">
                {selectedAvatar ? (
                  <img
                    src={selectedAvatar}
                    alt="Selected Avatar"
                    className="block w-full h-full object-cover"
                  />
                ) : (
                  "Upload Avatar"
                )}
              </div>
            )}
            {/* Edit icon */}
            <div className="absolute top-1 right-1 bg-black text-white rounded-full p-1">
              <FaEdit />
            </div>
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar-upload"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        </div>

              {/* Submit Button */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 text-gray-700 py-2 px-4 mt-6 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default TwoStepForm;
