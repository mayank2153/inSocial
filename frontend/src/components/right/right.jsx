import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { IoMdArrowBack, IoMdSettings, IoMdAddCircle } from "react-icons/io";
import LikedCategories from "../category/likedCategories";
import SettingAccordian from "../settings/setting.Accordian";
// import SwitchButton from "../modes/DarkAndLight";
import Conversations from "../message/conversations.jsx";

const Right = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [showConversations, setShowConversations] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const handleMessagesClick = () => {
        setShowConversations(true);
        setShowSettings(false);
    };

    const handleSettingsClick = () => {
        setShowSettings(true);
        setShowConversations(false);
    };

    const handleBackClick = () => {
        setShowConversations(false);
        setShowSettings(false);
    };

    return isAuthenticated ? (
        <div className=" flex flex-col lg:block w-full">
            {/* Full content for large screens */}
            <div className={`hidden lg:block  bg-[#0d1114] min-h-[100vh] h-full border-l border-gray-600 overflow-y-scroll no-scrollbar ${showConversations || showSettings ? 'overflow-hidden' : ''}`}>
                {showConversations ? (
                    <>
                        <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
                            <IoMdArrowBack 
                                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                                onClick={handleBackClick}
                            />
                            <span className="pl-6 text-slate-200 font-mono text-lg">Messages</span>
                        </div>
                        <Conversations />
                    </>
                ) : showSettings ? (
                    <>
                        <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
                            <IoMdArrowBack 
                                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                                onClick={handleBackClick}
                            />
                            <span className="pl-6 text-slate-200 font-mono text-lg">Settings</span>
                        </div>
                        <SettingAccordian title="Settings" />
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

            {/* Footer with icons only for small screens */}
            <div className="lg:hidden flex justify-around bg-[#0d1114] text-white py-2 fixed bottom-0 w-full">
                {showConversations ? (
                    <div className="w-full bg-[#0d1114] min-h-[calc(100vh-3.5rem)] pt-4">
                        <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
                            <IoMdArrowBack 
                                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                                onClick={handleBackClick}
                            />
                            <span className="pl-6 text-slate-200 font-mono text-lg">Messages</span>
                        </div>
                        <Conversations />
                    </div>
                ) : showSettings ? (
                    <div className="w-full bg-[#0d1114] min-h-[calc(100vh-3.5rem)] pt-4">
                        <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
                            <IoMdArrowBack 
                                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                                onClick={handleBackClick}
                            />
                            <span className="pl-6 text-slate-200 font-mono text-lg">Settings</span>
                        </div>
                        <SettingAccordian title="Settings" />
                    </div>
                ) : (
                    <>
                        <button onClick={handleMessagesClick} className="focus:outline-none">
                            <TiMessage size={25} />
                        </button>
                        <Link to="/createPost" className="focus:outline-none">
                            <IoMdAddCircle size={25} />
                        </Link>
                        <button onClick={handleSettingsClick} className="focus:outline-none">
                            <IoMdSettings size={25} />
                        </button>
                    </>
                )}
            </div>
        </div>
    ) : null;
};

export default Right;
