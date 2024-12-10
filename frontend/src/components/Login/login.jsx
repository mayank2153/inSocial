import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../utils/authslice.jsx";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader.js";

const url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}users/login`, user, {
        withCredentials: true,
      });
      dispatch(loginSuccess(response.data));
      setLoading(false);

      navigate("/");
      toast.success(response?.data?.message);
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || "Login failed", {
        duration: 4000,
        icon: <AiOutlineCloseCircle />,
      });
      setLoading(false);
      dispatch(loginFailure(error?.response?.data?.message));
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${url}users/auth/google`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center min-h-screen bg-[#121212] w-full">
      <div className="flex w-full max-w-screen-2xl mx-auto">
        <div className="hidden lg:block lg:w-2/5 relative">
          <img
            src=""
            alt="Login Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h2 className="text-5xl text-center text-white font-bold mb-8">
              SIGN<span className="pl-2 text-[#7f3fbf]">IN</span>
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded focus:outline-none  text-white"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Password"
                  className="w-full px-3 py-2 my-3 border rounded focus:outline-none  text-white"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none text-gray-400"
                >
                  {showPassword ? (
                    <FaEyeSlash size={22} />
                  ) : (
                    <FaEye size={22} />
                  )}
                </button>
              </div>

              {/* Always visible Forget Password link */}
              <div className="text-right">
                <Link to="/Forget-Password">
                  <span className="text-sm text-red-400 hover:text-red-600 transition-all duration-300">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#7f3fbf] text-white py-2 rounded hover:bg-[#7b21d6] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100 flex items-center justify-center"
              >
                {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
              </button>

              {/* Google Login Button */}
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
                onClick={handleGoogleLogin}
                className="w-full bg-white text-[#7f3fbf] py-2 rounded hover:text-[#7b21d6] focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold duration-100 flex items-center justify-center gap-2"
              >
                <FaGoogle size={20} />
                Sign in with Google
              </button>
            </form>

            <div className="text-center mt-4 flex gap-2 justify-center">
              <p className="text-slate-300">Don&apos;t have an account?</p>
              <Link to="/register" className="text-[#7f3fbf] hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
