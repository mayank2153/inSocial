import { useState } from "react";
import { useSelector } from "react-redux";
import { ChangecurrentPassword } from "../../api/changeCurrentPassword";
import { IoMdArrowRoundBack } from "react-icons/io";
import {Link} from "react-router-dom";
import { UserLogout } from "../../api/userLogout";
import { useDispatch } from "react-redux";

const ChangeCurrentPassword = () => {
    const dispatch = useDispatch();
    const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
    const userData = useSelector((state) => state.auth.user);
    const userId = userData?.data?.user?._id;

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Check if confirmPassword is being updated
        if (name === "confirmPassword") {
            // Update passwordMatch based on whether the passwords match
            setPasswordMatch(value === formData.newPassword);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // You can add more form submission logic here
        if (!passwordMatch) {
            alert("Passwords do not match!");
            return;
        }
        // Submit the form if passwords match
        try {
            // Submit the form if passwords match
            await ChangecurrentPassword(formData, userId);
    
            // Logging out the user
            await UserLogout(userData, dispatch);
    
            // Redirect or handle post-logout actions
            // Example: navigate to the login page
            // navigate('/login');
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred during submission. Please try again.");
        }
    };

    return (
        <div className=" bg-[#0d1114] min-h-screen overflow-y-scroll no-scrollbar flex flex-col items-center px-16">

            <div className="text-slate-200 text-center mt-20 flex gap-28">
                <Link to="/">
                    <IoMdArrowRoundBack className="-ml-32 mt-2" size={25}/>
                </Link>
                
                <h2 className="text-2xl font-mono">Change Password</h2>
            </div>
            <div className="justify-center  mt-10">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="text-slate-300 mb-2">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-300">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-slate-300">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {!passwordMatch && formData.confirmPassword && (
                        <p className="text-red-600 font-mono">Passwords do not match</p>
                    )}
                   <div className="flex justify-center">
                     
                   <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 px-4 py-2  w-[200px] bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                    
                   </div>
                    
                </form>
            </div>
        </div>
    );
};

export default ChangeCurrentPassword;