import React, { useState } from 'react';
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ isSearchOpen, setIsSearchOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/searchresults?query=${searchQuery}`);
        }
    };

    const handleCancelSearch = () => {
        setSearchQuery(''); // Clear the input
        if (window.innerWidth < 1024) { // Close the search bar on smaller screens
            setIsSearchOpen(false);
        }
        if(window.innerWidth > 1024){
          setIsSearchOpen(true)
        }
    };

    return (
        <div className="flex items-center px-4 lg:px-8 lg:max-w-[35rem] max-w-[12rem]">
            {isSearchOpen && (
                <>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="w-full py-2 px-4 border border-gray-300 rounded-l-full outline-none"
                    />
                    <button
                        type="button"
                        className="p-2 text-red-500 bg-white rounded-r-full cursor-pointer"
                        onClick={handleCancelSearch}
                    >
                        <IoMdClose size={25} />
                    </button>
                </>
            )}
            {!isSearchOpen && (
                <button
                    type="button"
                    className="inline-flex p-2 text-white rounded-md lg:hidden"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <IoIosSearch size={25} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
