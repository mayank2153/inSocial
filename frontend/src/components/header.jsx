import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePage from './userProfile/profilePage';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  // const userId = userData?.data?.user?._id;
  const userProfileImage = userData?.data?.user?.avatar;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return isAuthenticated ? (
    <>
      <header className="bg-[#1e0832] fixed w-full border-b-2 border-black z-10">
        <div className="">
          <nav className="flex items-center h-16 lg:h-20 justify-between">
            <div className="flex-shrink-0">
              <Link to="/" title="Home" className="flex">
                <img className="w-auto h-8 lg:h-10 hidden lg:block" src={logo} alt="Logo" />
                <img className={`w-auto h-8 lg:h-10 lg:hidden ${isSearchOpen ? 'hidden' : 'block'}`} src={logo_img} alt="Logo" />
              </Link>
            </div>

            <div className="flex-grow px-4 lg:px-8 max-w-[35rem]">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full py-2 px-4 border border-gray-300 rounded-md outline-none ${isSearchOpen ? 'block' : 'hidden'} lg:block`}
              />
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              <a href="#" title="Notifications" className="text-white hover:text-blue-600">
                <IoIosNotificationsOutline size={30} />
              </a>
              <Link to="/createPost" className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Create</Link>
              <div className="relative">
                <img 
                  src={userProfileImage} 
                  alt='user Profile' 
                  className='w-12 h-12 rounded-full object-cover cursor-pointer' 
                  onClick={toggleProfile}
                />
                {isProfileOpen && <ProfilePage />}
              </div>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-white rounded-md lg:hidden"
              onClick={toggleSearch}
            >
              <IoIosSearch size={25} />
            </button>
            <div className={` lg:hidden px-4 py-2 ${isSearchOpen ? 'hidden' : 'block'} ml-4`}>
              <img 
                src={userProfileImage} 
                alt='user Profile' 
                className='w-12 h-12 rounded-full object-cover cursor-pointer' 
                onClick={toggleProfile}
              />
              {isProfileOpen && <ProfilePage />}
            </div>
          </nav>
        </div>
      </header>
    </>
  ) : null;
};

export default Header;
