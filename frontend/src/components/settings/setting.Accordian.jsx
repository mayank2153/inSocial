import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom"

const SettingAccordian = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleAccordian = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        // Close the accordion when the link is clicked
        setIsOpen(false);
    };


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
                        <div className="text-slate-200 pl-12 -mt-3 mb-1 cursor-pointer hover:underline transition-all duration-500">Change Email</div>
                    </Link>
                    <Link to="/Update-current-password" onClick={handleLinkClick}>
                        <div className="text-slate-200 pl-12  font-mono cursor-pointer hover:underline transition-all duration-500">Change Password</div>    
                    </Link>
                    
                    
                </div>
        </div>

    );
};

export default SettingAccordian;