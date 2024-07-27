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

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-gradient-to-b from-[#1e0832] via-[#290f42] to-[#452762] fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <nav className="flex items-center h-16 lg:h-20 justify-between">
          <div className="flex-shrink-0">
            <Link to="/" title="Home" className="flex">
              <img className="w-auto h-8 lg:h-10 hidden lg:block" src={logo} alt="Logo" />
              <img className={`w-auto h-8 lg:h-10 lg:hidden ${isSearchOpen ? 'hidden' : 'block'}`} src={logo_img} alt="Logo" />
            </Link>
          </div>

          {isAuthenticated ? (
            <>
              <div className="hidden lg:flex lg:items-center lg:space-x-2">
                <SearchBar />
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
              <div className={`lg:hidden px-4 py-2 ${isSearchOpen ? 'hidden' : 'block'} ml-4`}>
                <img
                  src={userProfileImage}
                  alt='user Profile'
                  className='w-12 h-12 rounded-full object-cover cursor-pointer'
                  onClick={toggleProfile}
                />
                {isProfileOpen && <ProfilePage />}
              </div>
            </>
          ) : (
            <>
              <SearchBar />
              <Link to="/login" className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 lg:hidden">
                Login
              </Link>
              <Link to="/login" className="hidden lg:block px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
