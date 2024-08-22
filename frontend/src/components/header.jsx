import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePage from './userProfile/profilePage';
import SearchBar from './searchBar/searchBar.jsx';

const Header = ({ toggleCategories }) => {
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

  return isAuthenticated ? (
    <header className="bg-[#1e0832] w-full shadow-lg">
      <div className="container mx-auto px-4 lg:px-6 max-w-full">
      <nav className="flex items-center justify-between h-16 lg:h-20 overflow-hidden">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 text-white"
              onClick={toggleCategories}
            >
              <FaBars size={25} />
            </button>
            <Link to="/" title="Home" className="flex items-center ml-4">
            <img className="w-auto h-8 lg:h-10 hidden lg:block" src={logo} alt="Logo" />
              <img className={`w-auto h-8 lg:h-10 lg:hidden ${isSearchOpen ? 'hidden' : 'block'}`} src={logo_img} alt="Logo" />
            </Link>
          </div>

          <div className="hidden lg:flex flex-grow items-center justify-center">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" title="Notifications" className="text-white hover:text-blue-600">
              <IoIosNotificationsOutline size={30} />
            </a>

            <div className="relative overflow-hidden">
              <img
                src={userProfileImage}
                alt="User Profile"
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                onClick={toggleProfile}
              />
              {isProfileOpen && <ProfilePage />}
            </div>

            <button
              type="button"
              className="inline-flex lg:hidden p-2 text-white rounded-md"
              onClick={toggleSearch}
            >
              <IoIosSearch size={25} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  ) : null;
};

export default Header;
