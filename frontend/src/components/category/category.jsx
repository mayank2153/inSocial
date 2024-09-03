import React, { useEffect, useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../api/fetchAllCategories";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import LikedCategories from "./likedCategories.jsx"; // Import the LikedCategories component
// import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

const ShowCategories = ({ hideCategories }) => {
  const [categories, setCategories] = useState([]);
  const [isLikedCategoriesOpen, setLikedCategoriesOpen] = useState(true); // State for Liked Categories accordion
  const [isCategoriesOpen, setCategoriesOpen] = useState(false); // State for Categories accordion
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories);
      } catch (error) {
        console.error("There seems to be an error in fetching Categories:", error);
      }
    };

    getCategories();
  }, []);

  const toggleLikedCategories = () => {
    setLikedCategoriesOpen(!isLikedCategoriesOpen);
  };

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

  return isAuthenticated ? (
    <div className="bg-[#0d1114] h-screen shadow-xl overflow-y-scroll no-scrollbar border-r border-gray-600 w-full">
      <div className="mt-8 border-b-2 border-gray-600 pb-4">
        <Link to="/" onClick={hideCategories}>
          <h1 className="text-slate-300 flex items-center gap-2 pl-20 text-xl">
            <FaHome /> Home
          </h1>
        </Link>
      </div>
      {/* Accordion for Liked Categories */}
      <div className="py-3 border-b-2 border-gray-600 lg:hidden">
        <div
          className="pl-6 text-slate-200 cursor-pointer flex justify-between items-center"
          onClick={toggleLikedCategories}
        >
          <span><h1 className="text text-slate-400">Liked Categories</h1></span>
          <span className="text-lg">{isLikedCategoriesOpen ?  <IoIosArrowUp className="mr-1"/>: <IoIosArrowDown className="mr-1"/>}</span>
        </div>
        {isLikedCategoriesOpen && (
          <div className="pl-6 mt-2">
            <LikedCategories />
          </div>
        )}
        <Link
          to="/registerCategory"
          className="px-6 py-3 text-slate-200 font-mono text-lg flex gap-4 hover:text-white hover:underline transition-all duration-300 hover:text-xl" onClick={hideCategories}
        >
          <FaPlus className="mt-1" /> Add Categories
        </Link>
      </div>
      {/* Accordion for Categories */}
      <div className="py-3 border-b-2 border-gray-600">
        <div
          className="pl-6 text-slate-200 cursor-pointer flex justify-between items-center"
          onClick={toggleCategories}
        >
          <span><h1 className="text text-slate-400">Categories</h1></span>
          <span className="text-lg">{isCategoriesOpen ? <IoIosArrowUp className="mr-1"/> : <IoIosArrowDown className="mr-1"/>}</span>
        </div>
        {isCategoriesOpen && (
          <div className="mt-3 pl-8">
            <ul>
              {categories.map((category) => (
                <Link
                  to={`/posts/category/${category._id}`}
                  key={category._id}
                  onClick={hideCategories}
                >
                  <div className="flex gap-2 mb-4 ml-4">
                    <li className="rounded-full">
                      <img
                        className="rounded-full h-8 w-8 object-cover"
                        src={category.media}
                        alt={category.name}
                      />
                    </li>
                    <li className="mt-1 text-sm text-slate-100">
                      {category.name}
                    </li>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default ShowCategories;
