import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader.js";
import { sendOtp } from "../../api/sendOtp";
import usernameGenerator from "../../api/usernameGenerator.js";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await sendOtp(formData.email, "registration");
      setLoading(false);
      navigate("/verifyEmail", { state: formData });
    } catch (error) {
      setLoading(false);
      setServerError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${url}users/auth/google`;
  };

  const generateUniqueUsername = async () => {
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center min-h-screen bg-[#121212] w-full">
      <div className="flex w-full max-w-screen-2xl mx-auto">
        <div className="hidden lg:block lg:w-3/5 relative">
          <img
            src=""
            alt="Registration Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="w-full lg:w-2/5 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h2 className="text-4xl text-center text-white font-bold mb-8">
              CREATE <span className="text-[#7f3fbf]">ACCOUNT</span>
            </h2>

            {serverError && (
              <p className="text-red-500 text-center mb-4">{serverError}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded focus:outline-none bg-gray-800 text-white"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full px-3 py-2 border rounded focus:outline-none bg-gray-800 text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={generateUniqueUsername}
                  className="absolute right-0 top-0 mt-1 mr-1 p-2 text-gray-400 hover:text-white"
                  title="Generate Unique Username"
                >
                  <FaGoogle />
                </button>
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded focus:outline-none bg-gray-800 text-white"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none text-gray-400"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#7f3fbf] text-white py-2  rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  "Register"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#121212] text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full bg-white text-[#7f3fbf] py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100 flex items-center justify-center gap-2"
              >
                <FaGoogle size={20} />
                Sign up with Google
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link to="/login" className="text-[#7f3fbf] hover:underline">
                  SIGN IN
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
