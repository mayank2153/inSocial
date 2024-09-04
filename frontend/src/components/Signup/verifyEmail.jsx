import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../../api/userRegister";
import { sendOtp } from "../../api/sendOtp";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signUpData = location.state;
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);  // Countdown state starting at 60 seconds

  useEffect(() => {
    // Start a countdown timer
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId); // Clean up the timer on component unmount
    } else {
      setIsResendVisible(true); // Show the resend button when countdown reaches 0
    }
  }, [countdown]);

  
  useEffect(() => {
    if (!signUpData) {
      navigate('/register');
    }
  }, [signUpData, navigate]);
  const handleVerifyAndSignup = async () => {
    setLoading(true);

    try {
     
      
      const response = await UserRegister({ ...signUpData, otp });

      
      setLoading(false)
      setTimeout(() => {
        navigate("/login")  
      }, 3000);
      
      
    } catch (error) {
      setLoading(false)
      console.error("Error verifying OTP and signing up:", error);
    }
  };

  const resendOtp = async () => {
    try {
      await sendOtp(signUpData.email,'registration');
      
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unexpected Error')
    }
  };

  return (
    <div className="min-h-[100vh] grid place-items-center bg-black">
    <div className="max-w-[500px] p-4 lg:p-8 text-center">
      <h1 className="text-richblack-5 font-mono text-slate-200  text-[1.875rem] leading-[2.375rem]">
        Verify Email
      </h1>
      <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
        A verification code has been sent to you. Enter the code below
      </p>
      <form>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
            />
          )}
          containerStyle={{
            justifyContent: "space-between",
            gap: "0 6px",
          }}
        />
        <button
          type="button"
          onClick={handleVerifyAndSignup}
          className="w-full bg-blue-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-slate-300 hover:bg-blue-700 transition-all duration-300 hover:text-slate-100"
        >
          {loading ? <ClipLoader color="#ffffff" size={20} className="mt-1"/> : 'Verify Email'}
        </button>
      </form>
      <div className="mt-6 flex items-center justify-between">
        <Link to="/register">
          <p className="text-slate-200 font-mono flex items-center gap-x-2">
            <BiArrowBack /> Back To Signup
          </p>
        </Link>

        {isResendVisible ? (
          <button
            className="flex items-center text-blue-600 gap-x-2"
            onClick={resendOtp}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        ) : (
          <div className="flex items-center text-slate-200 gap-x-2">
            <RxCountdownTimer />
            <span>Resend in {countdown}s</span>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default VerifyEmail;
