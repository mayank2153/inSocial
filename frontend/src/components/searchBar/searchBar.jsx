import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/searchresults?query=${searchQuery}`);
      }
    }
  };
  const handleSubmit=()=>{
    if (searchQuery.trim()) {
      navigate(`/searchresults?query=${searchQuery}`);
    }
  }

  return (
    <div className=" px-4 lg:px-8 lg:max-w-[35rem] max-w-[12rem] flex">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={`w-full py-2 px-4 border border-gray-300 rounded-md outline-none lg:block`}
      />
      <button onClick={handleSubmit}
      className={`inline-flex lg:hidden p-2 text-white rounded-md ${isSearchOpen ? 'block' : 'hidden'}`}>
        <IoIosSearch size={25} />
      </button>
    </div>
  );
};

export default SearchBar;
