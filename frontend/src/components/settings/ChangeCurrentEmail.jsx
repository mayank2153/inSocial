import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ChangeCurrentEmail = () => {
    UserData = useSelector((state) => state.auth.user);
    userId = UserData?.data?.user?._id;
    const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';
    
    const [formData, seyFormData] = useState({
        email: '',
        newEmail: ''
    })


    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        seyFormData({...formData, [name]: value})
        
    }

    const handleSubmit = async() => {
        e.preventDefault();
        try {
            axios.post(`${url}users/change-current-Email/${userId}`, formData);
        } catch (error) {
            console.log('there seems to be a problen in changing email', error);
               
        }
    }

    return(
        <div className="w-full bg-black">
            <div className="text-slate-200 text-center mt-20">
                <h2 className="text-2xl font-mono">Change Email</h2>
            </div>
            <div className="w-1/2 justify-center ml-44 mt-10">
                <form>
                    <div className="mb-4">
                        <label className="text-slate-300 mb-2">Current Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            //  placeholder="Current Email"
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
                        //    placeholder="New Email"
                            className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 px-4 py-2 ml-28 w-[125px] bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    >
                        Submit
                    </button>
                    
                    
                </form>
            </div>
        </div>

    )

}

export default ChangeCurrentEmail