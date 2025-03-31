const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from "axios";
import { checkUserName } from "../../api/auth.api";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { loginSuccess, loginFailure } from '../../utils/authslice.jsx';


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState({
    isChecking: false,
    isAvailable: true,
    message: '',
    isValid: true
  });

  const validateUsername = (username) => {
    if (username.includes(' ')) {
      return {
        isValid: false,
        message: 'Username cannot contain spaces'
      };
    }
    
    const specialCharsRegex = /[^a-zA-Z0-9_]/;
    if (specialCharsRegex.test(username)) {
      return {
        isValid: false,
        message: 'Username can only contain letters, numbers, and underscores'
      };
    }
    
    return {
      isValid: true,
      message: ''
    };
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    if (name === 'username') {
      const validation = validateUsername(value);
      
      setUsernameStatus({
        isChecking: false,
        isAvailable: true,
        message: validation.isValid ? '' : validation.message,
        isValid: validation.isValid
      });
      
      if (validation.isValid || value === '') {
        setUser({ ...user, [name]: value });
      }
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  useEffect(() => {
    const checkUsernameTimeout = setTimeout(async () => {
      if (user.username && user.username.length >= 3 && usernameStatus.isValid) {
        setUsernameStatus(prev => ({ ...prev, isChecking: true }));
        try {
          const response = await checkUserName(user.username);
          
          setUsernameStatus(prev => ({
            ...prev,
            isChecking: false,
            isAvailable: true,
            message: 'Username is available'
          }));
        } catch (error) {
          setUsernameStatus(prev => ({
            ...prev,
            isChecking: false,
            isAvailable: false,
            message: error?.response?.data?.message || 'Username is already taken'
          }));
        }
      }
    }, 500);
    return () => clearTimeout(checkUsernameTimeout);
  }, [user.username]);

  const handlesignup = async (e) => {
    e.preventDefault();
    
    if (!usernameStatus.isValid) {
      toast.error(usernameStatus.message || "Please enter a valid username");
      return;
    }
    
    if (!usernameStatus.isAvailable) {
      toast.error("Please choose a different username");
      return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post(`${url}users/login`, user, {
        withCredentials: true,
      });
      dispatch(loginSuccess(response.data));
      setLoading(false);

      navigate('/');
      toast.success(response?.data?.message || 'Registration successful!');
    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || 'Registration failed', {
        duration: 4000,
      });
      setLoading(false);

      dispatch(loginFailure(error?.response?.data?.message));
      setForgetPassword(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:w-[calc(100%-40%)] sm:w-[calc(100%-35%)] ">
      <h2 className="text-3xl text-left text-white mb-6">Sign Up</h2>
      <form onSubmit={handlesignup} className="space-y-4">
        <div className="">
          <label className="block text-md text-[#EDEDED] pb-1">
            Enter your Email address
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            placeholder="Enter your email address"
            className="w-full px-3 py-2 text-[#BDBDBD] rounded-md bg-[#1e1e1e] focus:outline-none border border-[#BDBDBD]"
            required
          />
        </div>
        <div>
          <label className="block text-md text-[#EDEDED] pb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username (letters, numbers, underscores only)"
            value={user.username}
            onChange={handleInput}
            className={`w-full px-3 py-2 text-[#BDBDBD] rounded-md bg-[#1e1e1e] focus:outline-none border ${
              !usernameStatus.isValid
                ? 'border-red-500'
                : usernameStatus.isChecking 
                  ? 'border-yellow-500' 
                  : usernameStatus.message && !usernameStatus.isAvailable 
                    ? 'border-red-500' 
                    : usernameStatus.message && usernameStatus.isAvailable 
                      ? 'border-green-500' 
                      : 'border-[#BDBDBD]'
            }`}
            required
            minLength={3}
          />
          {!usernameStatus.isValid && (
            <p className="text-red-500 text-sm mt-1">{usernameStatus.message}</p>
          )}
          {usernameStatus.isValid && usernameStatus.isChecking && (
            <p className="text-yellow-500 text-sm mt-1">Checking username...</p>
          )}
          {usernameStatus.isValid && !usernameStatus.isChecking && usernameStatus.message && (
            <p className={`text-sm mt-1 ${usernameStatus.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
              {usernameStatus.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-[#EDEDED] text-md pb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-[#BDBDBD] rounded-md bg-[#1e1e1e] focus:outline-none border border-[#BDBDBD]"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none text-[#BDBDBD]"
            >
              {showPassword ? (
                <FaEyeSlash size={22} />
              ) : (
                <FaEye size={22} />
              )}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            {forgetPassword && (
              <div>
                <Link to="/auth/Forget-Password">
                  <span className="text-right w-full text-sm font-sans pt-1 hover:cursor-pointer text-red-400 hover:text-red-600 transition-all duration-300">
                    forget Password?
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4 mb-4">
          <button
            type="submit"
            className={`w-full bg-[#7F3FBF] text-slate-200 py-2 rounded-md hover:bg-[#6b30a7] focus:outline-none font-semibold duration-200 ${
              !usernameStatus.isValid || !usernameStatus.isAvailable || usernameStatus.isChecking 
                ? 'opacity-70 cursor-not-allowed' 
                : ''
            }`}
            disabled={!usernameStatus.isValid || !usernameStatus.isAvailable || usernameStatus.isChecking}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={20} className="mt-1" />
            ) : (
              'Sign Up'
            )}
          </button>
          <p className="text-[#D9D9D9] text-center w-full">Or</p>
          <button
            type="button"
            className="w-full text-slate-200 py-2 rounded-md font-semibold duration-200 border border-[#BDBDBD]"
          >
            <div className="flex justify-center items-center gap-2 text-[#D9D9D9]">
              <img
                src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1740912973/google_1_ws7mje.svg"
                className="h-6"
                alt="Google logo"
              />
              <p>Sign Up With Google</p>
            </div>
          </button>
        </div>
      </form>
      <div className="text-center flex gap-2 justify-center mt-1">
        <p className="text-[#D9D9D9]">Already have an account?</p>
        <Link to="/auth/login" className="text-[#7F3FBF] font-semibold">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
