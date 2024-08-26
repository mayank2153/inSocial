import { useState } from "react";
import axios from "axios";
import { resetPassword } from "../../api/resetPassword";

const ResetPassword = () => {
  const url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/";

  // Extract the reset token from the URL
  const resetToken = window.location.href.split("/")[4];

  const [reset, setReset] = useState({
    password: "",
    newPassword: "",
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

    // Check if passwords match
    if (reset.password !== reset.newPassword) {
      alert("New password and confirm password must be the same");
      return;
    }

    try {
      console.log(reset); // Log the reset object for debugging

      await resetPassword(reset); // Call the resetPassword function with the reset object

      alert("Password reset successfully!"); // Notify user of success
      setReset({ password: "", newPassword: "", resetlink: resetToken }); // Reset state
    } catch (error) {
      console.log("There seems to be an error in resetting the password", error);
      setReset({ password: "", newPassword: "", resetlink: resetToken }); // Reset state on error
    }
  };

  return (
    <div className="w-full h-[100vh] bg-black">
      <div className="text-center pt-[30vh]">
        <span className="text-slate-200 text-3xl font-mono">Reset Password</span>
      </div>
      <div>
        <form className="flex flex-col items-center mt-8" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password" // Name attribute for state management
            placeholder="New Password"
            value={reset.password} // Bind the value to state
            onChange={handleInput}
            className="w-96 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="newPassword" // Name attribute for state management
            placeholder="Confirm Password"
            value={reset.newPassword} // Bind the value to state
            onChange={handleInput}
            className="w-96 p-2 mt-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit" // Changed to submit to handle the form in the onSubmit handler
            className="w-36 bg-blue-500 text-slate-300 py-2 rounded-full mt-4 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 font-semibold duration-100 transition-all duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
