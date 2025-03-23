import { useState } from 'react';
import axios from 'axios';
import { resetPassword } from '../../api/resetPassword';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const ResetPassword = () => {
  const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
  const navigate = useNavigate();
  // Extract the reset token from the URL
  const resetToken = window.location.href.split('/')[4];
  const [Loading, setLoading] = useState(false);
  const [reset, setReset] = useState({
    password: '',
    newPassword: '',
    resetlink: resetToken, // Correctly initialize with the extracted token
  });

  // Update state based on input field changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setReset((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    // Check if passwords match
    if (reset.password !== reset.newPassword) {
      alert('New password and confirm password must be the same');
      return;
    }

    try {
      await resetPassword(reset); // Call the resetPassword function with the reset object

      setReset({ password: '', newPassword: '', resetlink: resetToken }); // Reset state
      setLoading(false);
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      console.error(
        'There seems to be an error in resetting the password',
        error,
      );
      setLoading(false);
      setReset({ password: '', newPassword: '', resetlink: resetToken }); // Reset state on error
    }
  };

  return (
    <div className="text-[#ededed] mx-auto sm:px-10 ">
      <div className="text-center ">
        <span className="font-semibold text-xl lg:text-2xl ">
          Reset Password
        </span>
      </div>
      <div>
        <form
          className="flex flex-col items-center mt-4 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="password"
            name="password" 
            placeholder="New Password"
            value={reset.password} 
            onChange={handleInput}
            className="w-full px-3 py-2 h-12 text-[#BDBDBD]  rounded-lg bg-[#1e1e1e]  focus:outline-none border border-[#BDBDBD]"
          />
          <input
            type="password"
            name="newPassword" 
            placeholder="Confirm Password"
            value={reset.newPassword}
            onChange={handleInput}
            className="w-full px-3 py-2 h-12 text-[#BDBDBD]  rounded-lg bg-[#1e1e1e]  focus:outline-none border border-[#BDBDBD]"
            />
          <button
            type="submit" 
            className="w-full bg-[#7F3FBF] h-12 text-slate-200 py-2 rounded-xl hover:bg-[#6b30a7]  focus:outline-none  font-semibold duration-200"
          >
            {Loading ? (
              <ClipLoader color="#ffffff" size={20} className="mt-1" />
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
