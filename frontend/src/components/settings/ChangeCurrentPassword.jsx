import { useState } from "react";
import { useSelector } from "react-redux";

const ChangeCurrentPassword = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add more form submission logic here
        if (!passwordMatch) {
            alert("Passwords do not match!");
            return;
        }
        // Submit the form if passwords match
    };

    return (
        <div className="w-full bg-black">
            <div className="text-slate-200 text-center mt-20">
                <h2 className="text-2xl font-mono">Change Password</h2>
            </div>
            <div className="w-1/2 justify-center ml-44 mt-10">
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
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 ml-20 w-[200px] bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangeCurrentPassword;
