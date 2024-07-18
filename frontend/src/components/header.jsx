import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-[#1e0832] fixed w-full border-t-slate-300 border-b-slate-300 border-y-2 z-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
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
            <Link to="/login" className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-white rounded-md lg:hidden"
            onClick={toggleSearch}
          >
            <IoIosSearch size={25} />
          </button>
          <Link to="/login" className={`lg:hidden px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 ${isSearchOpen ? 'hidden' : 'block'} ml-4`}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
