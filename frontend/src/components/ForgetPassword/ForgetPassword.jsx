import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { forgetPassword } from '../../api/forgetPassword';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../utils/darkmodeSlice';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
  const dispatch=useDispatch();
  const [Loading, setLoading] = useState(false);
  const darkMode= useSelector((state) => state.theme.darkMode);
  console.log("dark mode: " + darkMode);
  const handleInput = (e) => {
    setEmail(e.target.value);
  }

  const handleForgetPassword = async () => {
    setLoading(true);

    try {
      await forgetPassword(email);
      setLoading(false);
    } catch (error) {
      console.error('there seems to be a problem in fetching email', error);
      setLoading(false);
    }
  };

  return (
    <div className="text-[#ededed] mx-auto px-10">
      <p className=' font-semibold text-xl lg:text-2xl'>Forget Password</p>
      <p className='text-[#e0e0e099] text-md lg:text-lg'>Enter your email and we will send you instructions to reset your password</p>
      <div className="my-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInput}
                placeholder='Enter your Email Address'
                className="w-full px-3 py-2 text-[#BDBDBD] h-12  rounded-md bg-[#1e1e1e]  focus:outline-none border border-[#BDBDBD]"
              />
            </div>
       <div className="space-y-4 mt-8">
              <button
                className="w-full bg-[#7F3FBF] h-12 text-slate-200 py-2 rounded-xl hover:bg-[#6b30a7]  focus:outline-none  font-semibold duration-200"
              >
                {Loading ? (
                  <ClipLoader color="#ffffff" size={20} className="mt-1 text-lg" />
                ) : (
                  'Reset Password'
                )}
              </button>
              
            </div>
    </div>
  );
};

export default ForgetPassword;
