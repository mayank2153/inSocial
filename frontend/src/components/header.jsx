import React, { useState } from 'react';
import { IoIosNotificationsOutline, IoIosSearch } from "react-icons/io";
import logo from "../assets/images/logo.png";
import logo_img from "../assets/images/logo_img.png";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="pb-6 bg-[#3c126c] lg:pb-0 h-16 lg:h-20  border-t-slate-300 border-b-slate-300 border-y-2">
      <div className="px-0 mx-0 max-w-7xl sm:px-0 lg:px-0">
        {/* lg+ */}
        <nav className="flex items-center h-16 lg:h-20 justify-between w-[100vw] lg:px-10 px-5">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex">
              <img className="w-auto h-8 lg:h-10 hidden lg:block" src={logo} alt="Logo" />
              <img className={`w-auto h-8 lg:h-10 lg:hidden ${isSearchOpen ? 'hidden' : 'block'}`} src={logo_img} alt="Logo" />
            </a>
          </div>

          <div className="flex-grow px-4 lg:px-8 max-w-[35rem]">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full py-2 px-4 border border-gray-300 rounded-md outline-none ${isSearchOpen ? 'block' : 'hidden'} lg:block`}
            />
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            <a href="#" title="" className="text-base font-medium text-white transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
              <IoIosNotificationsOutline size={30} />
            </a>
            <a href="#" title="" className="items-center justify-center  px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button">
              Login
            </a>
          </div>

          {/* Menu button for mobile */}
          <button
            type="button"
            className="inline-flex p-2 text-white transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={toggleSearch}
          >
            <IoIosSearch size={25} />
          </button>
          <a href="#" title="" className={`items-center justify-center lg:hidden px-1 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700 ml-4 ${isSearchOpen ? 'hidden' : 'block'}`} role="button">
              Login
            </a>
        </nav>


      </div>
    </header>
  );
};

export default Header;
