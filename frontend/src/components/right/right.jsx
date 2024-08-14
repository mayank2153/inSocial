import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import LikedCategories from "../category/likedCategories";
import SettingAccordian from "../settings/setting.Accordian";
import SwitchButton from "../modes/DarkAndLight";

const Right = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? (
        <div className="min-w-[400px] bg-[#0d1114] min-h-[100vh] h-full border-l-2 border-gray-600 overflow-y-scroll no-scrollbar">
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
            <div className="my-4 border-b-2 border-gray-600 pb-6">
                <SwitchButton />
            </div>
            <div>
                <SettingAccordian title="Settings" />
            </div>
            
        </div>
    ) : null;
};

export default Right;
