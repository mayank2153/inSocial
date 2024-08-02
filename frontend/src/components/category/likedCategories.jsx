import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import LikedCategoriesShimmer from "../shimmer/likedCategories.shimmer";

const LikedCategories = () => {
    const [change, setChange] = useState(true);
    const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;
    const userData = useSelector((state) => state.auth.user);
    const userlikedCategories = userData?.data?.user?.likedCategories;
    const [categories, setCategories] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const fetchingCategoriesByid = async () => {
        try {
            const fetchedCategories = [];
            for (let index = 0; index < userlikedCategories.length; index++) {
                const categoryId = userlikedCategories[index];
                const response = await axios.get(`${url}category/category/${categoryId}`);
                fetchedCategories.push(response.data);
            }
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleRemoveCategory = async (categoryId) => {
        try {
            await axios.post(`${url}users/remove-liked-category`, {
                userData,
                categoryId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            setCategories(categories.filter((category) => category._id !== categoryId));
            setChange(!change);
        } catch (error) {
            console.error('Error removing liked category:', error);
        }
    };

    useEffect(() => {
        fetchingCategoriesByid();
    }, [userlikedCategories]); // Only userlikedCategories is sufficient for dependencies

    if (userlikedCategories && categories.length < userlikedCategories.length) {
        return (
            <LikedCategoriesShimmer />
        )
    }

    return (
        <div className="w-64 rounded-xl ml-8 my-2 bg-[#13181d] shadow-2xl">
            {categories.length > 0 ? (
                <ul className="py-2">
                    {categories.map((category, index) => (
                        <div
                            className="flex gap-2 my-1 items-center justify-between hover:bg-[#2e2b2b] rounded transition-all duration-500"
                            key={index}
                            onMouseEnter={() => setHoveredCategory(category?.data?._id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className="flex items-center pl-2">
                                <img
                                    className="rounded-full h-8 w-8 object-cover"
                                    src={category?.data?.media}
                                    alt={category?.data?.name}
                                />
                                <li className="mt-1 text-sm text-slate-100 ml-2 cursor-pointer">
                                    {category?.data?.name}
                                </li>
                            </div>
                            {hoveredCategory === category?.data?._id && (
                                <button
                                    className="text-slate-100 hover:text-red-500 pr-2"
                                    onClick={() => handleRemoveCategory(category?.data?._id)}
                                >
                                    <RiDeleteBin6Line />
                                </button>
                            )}
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No categories found.</p>
            )}
        </div>
    );
};

export default LikedCategories;
