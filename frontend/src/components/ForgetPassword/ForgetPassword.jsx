import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../api/forgetPassword";
import toast from "react-hot-toast";

const ForgetPassword = () => {
    const [ email , setEmail ] = useState("");
    const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

    const handleForgetPassword = async() =>{
        console.log('hi');
        
        try {
            await forgetPassword(email);
            
        } catch (error) {
            console.log('there seems to be a problem in fetching email', error);
        }
        
    }
    
    
    return (
        <div className="w-full bg-black h-[100vh] flex justify-center ">
            <div className="w-full max-w-md mx-auto mt-[225px]">
                <h2 className="text-3xl text-center text-slate-300 font-mono mb-6">Forget Password</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-xl font-mono text-white pl-4 pb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-xl bg-slate-200 rounded-full"
                        />
                    </div>
                    <div>
                        <p className="text-white pl-4 -mt-2 font-mono">Remember Password ? 
                            <Link to="/login">
                                <span className="text-blue-500 cursor-pointer hover:underline">Login</span>
                            </Link>
                            
                        </p>
                    </div>
                    <button 
                        type="button"
                        onClick={handleForgetPassword}
                        className="w-[125px] ml-[150px] mt-6 py-2 text-xl font-mono bg-blue-500 rounded-full
                        text-white hover:bg-blue-700 transition-all duration-400">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword