import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import LikedCategories from "../category/likedCategories";
import SettingAccordian from "../settings/setting.Accordian";
import { TiMessage } from "react-icons/ti";
import { IoMdArrowBack } from "react-icons/io"; // Import back arrow icon
import Conversations from "../message/conversations.jsx"; // Import the Conversations component

const Right = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [showConversations, setShowConversations] = useState(false);

    const handleMessagesClick = () => {
        setShowConversations(true);
    };

    const handleBackClick = () => {
        setShowConversations(false);
    };

    return isAuthenticated ? (
        <div className="min-w-[400px] bg-[#0d1114] max-h-[100vh] h-full border-l-2 border-gray-600 overflow-y-scroll no-scrollbar overflow-x-clip">
            {showConversations ? (
                <>
                    <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
                        <IoMdArrowBack 
                            className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                            onClick={handleBackClick}
                        />
                        <span className="pl-6 text-slate-200 font-mono text-lg">Messages</span>
                    </div>
                    <Conversations /> {/* Render the Conversations component */}
                </>
            ) : (
                <>
                    <div className="py-3 my-6 border-b-2 border-gray-600">
                        <div
                            className="px-6 py-3 text-slate-200 font-mono text-lg flex gap-4 hover:text-white hover:underline transition-all duration-300 hover:text-xl items-center cursor-pointer"
                            onClick={handleMessagesClick}
                        >
                            <TiMessage className="mt-1" /> Messages
                        </div>
                    </div>
                    <div className="py-3 my-6 border-b-2 border-gray-600">
                        <span className="pl-6 text-slate-200">Something on your mind?</span>
                        <Link
                            to="/createPost"
                            className="px-6 py-3 text-slate-200 font-mono text-lg flex gap-4 hover:text-white hover:underline transition-all duration-300 hover:text-xl"
                        >
                            <FaPlus className="mt-1" /> Create
                        </Link>
                    </div>
                    <div className="py-3 my-6 border-b-2 border-gray-600">
                        <span className="pl-6 text-slate-200">Liked Categories</span>
                        <LikedCategories />
                        <Link
                            to="/registerCategory"
                            className="px-6 py-3 text-slate-200 font-mono text-lg flex gap-4 hover:text-white hover:underline transition-all duration-300 hover:text-xl"
                        >
                            <FaPlus className="mt-1" /> Add Categories
                        </Link>
                    </div>
                    <div>
                        <SettingAccordian title="Settings" />
                    </div>
                </>
            )}
        </div>
    ) : null;
};

export default Right;
