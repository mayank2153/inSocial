import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { sendOtp } from "../../api/sendOtp";
import logo from "../../assets/images/logo (3)-removebg-preview.jpg";
import { Link, useNavigate } from "react-router-dom";

const ChangeCurrentEmail = () => {
  const UserData = useSelector((state) => state.auth.user);
  const userId = UserData?.data?.user?._id;
  const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
  
  const [formData, setFormData] = useState({
    email: '',
    newEmail: '',
    scenario: 'emailChange',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    console.log(userId);

    try {
      const response = await sendOtp(formData.newEmail, 'emailChange');
      console.log('otp api response', response);

      // Navigate to verify-otp after successful OTP sending
      navigate("/change-current-email/verify-otp", {state : formData});
    } catch (error) {
      console.log('seems to be a problem while sending otp', error);
    }
  };

  return (
    <div className="flex items-center justify-evenly min-h-screen bg-black w-full">
      <div className="mt-14">
        <img src={logo} alt="logo.png" />
      </div>
      <div className="bg-black shadow-xl -mt-20 rounded-lg p-8 w-full max-w-md mr-40">
        <div className="text-slate-200 text-center pt-20">
          <h2 className="text-2xl font-mono">Change Email</h2>
        </div>
        <div className="mt-10">
          <form>
            <div className="mb-4">
              <label className="text-slate-300 mb-2">Current Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-slate-300">New Email</label>
              <input
                type="email"
                name="newEmail"
                onChange={handleChange}
                value={formData.newEmail}
                className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-evenly">
              <Link to="/">
                <button
                  type="button"
                  className="mt-4 px-4 py-2 -ml-32 w-[125px] bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  Back
                </button>
              </Link>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 -mr-32 w-[125px] bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeCurrentEmail;