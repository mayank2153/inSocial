import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const [reset, setReset] = useState({
    password: "",
    confirmPassword: "",
    resetlink : window.location.href.split("/")[4],
});

const handleInput = () =>{
    const name = e.target.name;
    const value = e.target.value;

    setReset({...reset, [name]:value});
}

const handleSubmit = async() => {
    e.preventDefault();
    if(reset.password !== reset.confirmPassword){
        alert('new password and confirm password both are different')
        return;
    }
    try {
        await axios.post( `${url}users/reset-password`, {reset})
    } catch (error) {
        console.log('there seems to be an error in resetting password', error);
        setReset({password: "", confirmPassword: ""})
        
    }
}

return (
    <div className="w-full h-[100vh] bg-black">
        <div className="text-center pt-[30vh]">
            <span className="text-slate-200 text-3xl font-mono">Reset Password</span>
        </div>
        <div>
            <form className="flex flex-col items-center mt-8">
                <input
                    type="password"
                    placeholder="New Password"
                    onChange={handleInput}
                    className="w-96 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleInput}
                    className="w-96 p-2 mt-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-36 bg-blue-500 text-slate-300 py-2 rounded-full mt-4 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 font-semibold duration-100 transition-all duration-300"
                >
                    Reset Password
                </button>
            </form>
        </div>
    </div>
)
}

export default ResetPassword;