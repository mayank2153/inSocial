import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";
import { Link } from 'react-router-dom';
import SearchBar from './searchBar/searchBar.jsx';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);


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

          {/* SearchBar Component */}
          <SearchBar />

          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            <a href="#" title="Notifications" className="text-white hover:text-blue-600">
              <IoIosNotificationsOutline size={30} />
            </a>
            <Link to="/createPost" className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Create</Link>
            <Link to="/login" className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>

          <Link to="/login" className={`lg:hidden px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ${isSearchOpen ? 'hidden' : 'block'} ml-4`}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
