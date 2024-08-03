import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import LikedCategoriesShimmer from "../shimmer/likedCategories.shimmer";
import { deleteCategory, setCategories as setCategoriesRedux } from "../../utils/categoryslice";
import { fetchCategoryDetails } from "../../api/fetchCategoryDetails";
import { fetchOwnerDetails } from "../../api/fetchOwnerDetails";

const LikedCategories = () => {
    const [change, setChange] = useState(true);
    const [user, setUser] = useState(null);
    const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;
    const userData = useSelector((state) => state.auth.user);
    // const userlikedCategories = userData?.data?.user?.likedCategories;
    const ownerID = userData?.data?.user?._id;
    // console.log(ownerID);
    const [categories, setCategories] = useState([]);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const dispatch = useDispatch();

    
        const fetchOwner = async() => {
            try {
               const ownerDetail =  await fetchOwnerDetails(ownerID);
               setUser(ownerDetail);
            //    console.log('owner details are : ',ownerDetail);
            } catch (error) {
                console.log('There seems to be an error while fetching owner details', error);
            }
        }
    useEffect(() => {
        fetchOwner();
    }, [ownerID])
    console.log('owner ', user);

    const userlikedCategories = user?.likedCategories;
    console.log('user liked categories', userlikedCategories);

    useEffect(() => {
        if (userlikedCategories) {
            dispatch(setCategoriesRedux(userlikedCategories));
        }
    }, [dispatch, userlikedCategories]);

    const likedCategories_redux = useSelector((state) => state.likedCategories.likesCategory);
    console.log('from redux:', likedCategories_redux);

    const fetchingCategoriesByid = async () => {
        try {
            const categoryIds = likedCategories_redux.map(category => category.categoryId);
            const fetchedCategories = await Promise.all(
                categoryIds.map(async (categoryId) => {
                    const response = await axios.get(`${url}category/category/${categoryId}`);
                    return response.data;
                })
            );
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    console.log('data in category',categories);
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
            dispatch(deleteCategory(categoryId));
            // console.log(likedCategories_redux);
            setCategories((prevCategories) => prevCategories.filter((category) => category.data._id !== categoryId));
            setChange(!change);
        } catch (error) {
            console.error('Error removing liked category:', error);
        }
    };

    useEffect(() => {
        if (likedCategories_redux && likedCategories_redux.length > 0) {
            fetchingCategoriesByid();
        }
    }, [likedCategories_redux, change]);

    if (likedCategories_redux && categories.length < likedCategories_redux.length) {
        return (
            <LikedCategoriesShimmer />
        );
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
