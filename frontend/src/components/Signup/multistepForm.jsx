import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    bio: "",
    avatar: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateStep = () => {
    let stepErrors = {};
    switch (step) {
      case 1:
        if (!formData.email) {
          stepErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          stepErrors.email = "Email is invalid";
        }
        break;
      case 2:
        if (!formData.username) {
          stepErrors.username = "Username is required";
        }
        if (!formData.password) {
          stepErrors.password = "Password is required";
        }
        break;
      
      default:
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      // console.log(formData)
      const response = await axios.post(`${url}users/register`, data);
      // console.log(response.data);
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = () => { if(validateStep()) setStep((prevStep) => prevStep + 1);}
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#0f031c] shadow-xl rounded-lg p-8 w-full  max-w-md" style={{ height: "500px", width: "450px" }}>
        <h2 className="text-2xl text-white font-bold mt-20">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="mb-4 ">
              <label className="block text-white pl-40 font-semibold mt-10 pb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.email && <p className="text-red-500 text-sm pl-2 mt-2">*{errors.email}</p>}
            </div>
          )}
          {step === 2 && (
            <>
              <div className="mb-4 mt-4">
                <label className="block text-white pl-4">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                 {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-white pl-4">Password</label>
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </>
          )}
          {step === 3 && (
            <>

              <div className="mb-4 mt-4">
                <label className="block text-white">Avatar</label>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 mt-6 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white py-2 mt-6 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
