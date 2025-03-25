import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { UserRegister } from '../../api/userRegister';
import { sendOtp } from '../../api/sendOtp';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const signUpData = location.state;
  const [Loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false); // Countdown state starting at 60 seconds
  
  useEffect(() => {
    // Start a countdown timer
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId); 
    } else {
      setIsResendVisible(true); // Show the resend button when countdown reaches 0
    }
  }, [countdown]);

  // useEffect(() => {
  //   if (!signUpData) {
  //     navigate('/register');
  //   }
  // }, [signUpData, navigate]);
  // const handleVerifyAndSignup = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await UserRegister({ ...signUpData, otp });

  //     setLoading(false);
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 3000);
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error verifying OTP and signing up:', error);
  //   }
  // };



  return (
    <div className="text-[#ededed] px-40">
      <p className=' font-semibold text-2xl'>Verify your Email</p>
      <p className='text-[#e0e0e099] text-lg'>To Start using Insocial, confirm your email address with the email we sent to:</p>
      <p className='my-4'>Dummy email</p>
       <div className="space-y-4 ">
              <button
                className="w-full bg-[#7F3FBF] text-slate-200 py-2 rounded-md hover:bg-[#6b30a7]  focus:outline-none  font-semibold duration-200"
              >
                {Loading ? (
                  <ClipLoader color="#ffffff" size={20} className="mt-1" />
                ) : (
                  'Verify Email'
                )}
              </button>
              <button
                className="w-full bg-[#7F3FBF] text-slate-200 py-2 rounded-md hover:bg-[#6b30a7]  focus:outline-none  font-semibold duration-200"
              >
                {Loading ? (
                  <ClipLoader color="#ffffff" size={20} className="mt-1" />
                ) : (
                  'Resend Email'
                )}
              </button>
              
            </div>
    </div>
  );
}

export default VerifyEmail;
