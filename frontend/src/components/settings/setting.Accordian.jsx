import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom"
import { IoIosMail } from "react-icons/io";
import { MdOutlineMailLock } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


const SettingAccordian = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
  const[loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toggleAccordian = () => {
        setIsOpen(!isOpen);
    };
    const handleuserLogOut = async() => {
        setLoading(true);
        const res =  await UserLogout(userData, dispatch);
      } 
    const handleLinkClick = () => {
        // Close the accordion when the link is clicked
        setIsOpen(false);
    };


    const handleChangePassword = () => {
        
        navigate('/Update-current-password')
        
    }
    return (
        <div className="accordian border-b-2 border-gray-600">
            <div 
                className="accordian-header cursor-pointer lg:flex  items-center gap-2 pl-6 pb-6 hidden "
                onClick={toggleAccordian}
            >
                <IoMdSettings className="text-white text-xl" />
                <span className="text-white  font-mono text-xl">{title}</span>
            </div>
            {isOpen && (
                <div className="accordian-content pb-4">
                    <Link to="/change-current-email">
                    <div className="text-slate-200 pl-12 -mt-3 mb-1 cursor-pointer hover:underline transition-all duration-500">Change Email</div>
                    </Link>
                    
                    <Link to="/Update-current-password">
                    <div className="text-slate-200 pl-12 cursor-pointer hover:underline transition-all duration-500">Change Password</div>    
                    </Link>
                    
                    
                </div>
            )}
            <div className="accordian-content pb-4 lg:hidden">
                    <Link to="/change-current-email" onClick={handleLinkClick}>
                        <div className="text-slate-200 mb-4 pl-6 -mt-3 text-lg mb-1 cursor-pointer flex gap-2 transition-all duration-500">
                            <MdOutlineMailLock size={25} className="mt-[2px]"/>Change Email</div>
                    </Link>
                    <div onClick={handleChangePassword}>
                         <div className="text-slate-200 pl-6 mb-4 text-lg font-mono cursor-pointer flex gap-2 transition-all duration-500">
                            <TbPasswordUser size={25} className="mt-[2px]" />
                            Change Password
                        </div>
                    </div>
                    <Link to="/contact-us" onClick={handleLinkClick}>
                        <span className=" text-slate-200  pl-6 font-mono text-lg cursor-pointer flex gap-2">
                            <IoIosMail size={25} className="mt-[2px]"/>Contact Us?
                        </span>
                    </Link>
                    <div className="pt-3 flex   justify-center">
                    <button className="w-[150px] h-[40px] bg-blue-500 hover:bg-blue-700 rounded-xl -ml-4" onClick={handleuserLogOut}>
                        {loading ? <ClipLoader color="#ffffff" size={20} className="mt-1" /> : 'Logout' } 
                    </button>
            </div>
                        
                    
                </div>
        </div>

    );
};

export default SettingAccordian;