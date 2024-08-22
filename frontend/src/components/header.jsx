import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePage from './userProfile/profilePage';
import SearchBar from './searchBar/searchBar.jsx';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  const userProfileImage = userData?.data?.user?.avatar;
  const userId=userData?.data?.user?._id

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return isAuthenticated ? (
    <header className="bg-[#0d1114]  w-full shadow-lg border-b-2 border-gray-600">
      <div className="max-w-7xl mx-auto ">
        <nav className="flex items-center h-16 lg:h-20 justify-between">
          <div className="flex items-center justify-end -ml-20">
            <Link to="/" title="Home" className="flex">
              <img className="w-auto h-8 lg:h-10 hidden lg:block" src={logo} alt="Logo" />
              <img className={`w-auto h-8 lg:h-10 lg:hidden ${isSearchOpen ? 'hidden' : 'block'}`} src={logo_img} alt="Logo" />
            </Link>
          </div>

          <div className="flex-grow hidden lg:flex lg:items-center lg:justify-center">
            <SearchBar />
          </div>

          {isAuthenticated ? (
            <div className="flex items-center justify-end space-x-4 -mr-20">
              <Link to={`/notification/${userId}`}>
                <IoIosNotificationsOutline size={30} className='text-white' />
              </Link>
              
              <div className="relative">
                <img
                  src={userProfileImage}
                  alt="user Profile"
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  onClick={toggleProfile}
                />
                {isProfileOpen && <ProfilePage />}
              </div>
              <button
                type="button"
                className="inline-flex p-2 text-white rounded-md lg:hidden"
                onClick={toggleSearch}
              >
                <IoIosSearch size={25} />
              </button>
              <div className={`lg:hidden py-2 ${isSearchOpen ? 'hidden' : 'block'}`}>
                <img
                  src={userProfileImage}
                  alt="user Profile"
                  className="w-12 h-12 rounded-full object-cover cursor-pointer"
                  onClick={toggleProfile}
                />
                {isProfileOpen && <ProfilePage isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4 mr-10">
              <SearchBar />
              <Link to="/login" className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 lg:hidden">
                Login
              </Link>
              <Link to="/login" className="hidden lg:block px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  ) : null
};

export default Header;
