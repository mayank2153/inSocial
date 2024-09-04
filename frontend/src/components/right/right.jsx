import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { TiMessage } from "react-icons/ti";
import { IoMdArrowBack, IoMdSettings, IoMdAddCircle } from "react-icons/io";
import LikedCategories from "../category/likedCategories.jsx";
import SettingAccordian from "../settings/setting.Accordian";
import Conversations from "../message/conversations.jsx";
import { IoIosMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { UserLogout } from "../../api/userLogout.js";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader.js";
import { closeChat } from "../../utils/chatSlice.jsx";

const Right = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showConversations, setShowConversations] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const isOpenChat = useSelector((state) => state.chat.isOpen);
  const userId = userData?.data.user
    ? userData?.data?.user?._id
    : userData?.data?._id;

  const handleMessagesClick = () => {
    setShowConversations(true);
    setShowSettings(false);
  };

  useEffect(() => {
    if(isOpenChat){
      setShowConversations(true);
      setShowSettings(false);
    }
  },[isOpenChat])


  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowConversations(false);
    dispatch(closeChat());
  };

  const handleBackClick = () => {
    setShowConversations(false);
    setShowSettings(false);
  };

  const handleuserLogOut = async () => {
    setLoading(true);
    const res = await UserLogout(userData, dispatch);
  };

  return isAuthenticated ? (
    <div className="flex flex-col justify-between lg:block w-full max-h-screen overflow-y-scroll no-scrollbar relative">
      {/* Full content for large screens */}
      <div
        className={`hidden lg:block bg-[#0d1114] min-h-[100vh] h-full border-l border-gray-600 overflow-y-scroll no-scrollbar pb-4 ${
          showConversations || showSettings ? "overflow-hidden " : ""
        }`}
      >
        {showConversations ? (
          <>
            <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
              <IoMdArrowBack
                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                onClick={handleBackClick}
              />
              <span className="pl-6 text-slate-200 font-mono text-lg">
                Messages
              </span>
            </div>
            <Conversations />
          </>
        ) : showSettings ? (
          <div
            className="fixed top-0 left-0 w-full h-full bg-[#0d1114] z-50 flex flex-col"
            style={{ overflowY: "scroll" }}
          >
            <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
              <IoMdArrowBack
                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                onClick={handleBackClick}
              />
              <span className="pl-6 text-slate-200 font-mono text-lg">
                Settings
              </span>
            </div>
            <SettingAccordian title="Settings" />
          </div>
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

            <div className="mt-2">
              <SettingAccordian title="Settings" />
            </div>

            <div className=" py-3   border-b-2 border-gray-600 flex gap-2">
              <span className="text-slate-200 mt-[3px] pl-6">
                <IoIosMail size={25} />
              </span>
              <Link to="/contact-us">
                <span className=" text-slate-200 font-mono text-lg cursor-pointer">
                  Contact Us?
                </span>
              </Link>
            </div>
            <div className="pt-3 flex   justify-center">
              <button
                className="w-[150px] h-[40px] bg-blue-500 hover:bg-blue-700 rounded-xl -ml-4"
                onClick={handleuserLogOut}
              >
                {loading ? (
                  <ClipLoader color="#ffffff" size={20} className="mt-1" />
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile version with fullscreen overlays */}
      <div className="lg:hidden flex justify-around bg-[#0d1114] text-white py-2 fixed bottom-0 w-full">
        {showConversations ? (
          <div className="fixed top-0 left-0 w-full h-full bg-[#0d1114] z-50 flex flex-col">
            <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
              <IoMdArrowBack
                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                onClick={handleBackClick}
              />
              <span className="pl-6 text-slate-200 font-mono text-lg">
                Messages
              </span>
            </div>
            <Conversations />
          </div>
        ) : showSettings ? (
          <div
            className="fixed top-0 left-0 w-full h-full bg-[#0d1114] z-50 flex flex-col"
            style={{ overflowY: "scroll" }}
          >
            <div className="py-3 my-6 border-b-2 border-gray-600 flex items-center">
              <IoMdArrowBack
                className="text-slate-200 cursor-pointer ml-4 text-2xl hover:text-white transition-all duration-300"
                onClick={handleBackClick}
              />
              <span className="pl-6 text-slate-200 font-mono text-lg">
                Settings
              </span>
            </div>
            <SettingAccordian title="Settings" />
          </div>
        ) : (
          <>
            <button
              onClick={handleMessagesClick}
              className="focus:outline-none"
            >
              <TiMessage size={25} />
            </button>
            <Link to="/createPost" className="focus:outline-none">
              <IoMdAddCircle size={25} />
            </Link>
            <button
              onClick={handleSettingsClick}
              className="focus:outline-none"
            >
              <IoMdSettings size={25} />
            </button>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Right;
