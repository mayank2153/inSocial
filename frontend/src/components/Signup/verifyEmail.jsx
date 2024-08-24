import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../../api/userRegister";
import { sendOtp } from "../../api/sendOtp";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signUpData = location.state;
  console.log("signudtaa:",signUpData)
  useEffect(() => {
    if (!signUpData) {
      navigate('/register');
    }
  }, [signUpData, navigate]);
  const handleVerifyAndSignup = async () => {

    try {
     
      console.log("data before sending:",signUpData)
      const response = await UserRegister({ ...signUpData, otp });
      console.log(response)
      navigate("/login")
    } catch (error) {
      console.error("Error verifying OTP and signing up:", error);
    }
  };

  const resendOtp = async () => {
    try {
      await sendOtp(signUpData.email);
      console.log('OTP resent successfully');
    } catch (error) {
      console.log('Error in sending OTP', error);
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
            Verify Email
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/signup">
            <p className="text-slate-200 font-mono flex items-center gap-x-2">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          <button
            className="flex items-center text-blue-600 gap-x-2"
            onClick={resendOtp}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
