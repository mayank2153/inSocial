import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LikedCategories = () => {
    const url = import.meta.env.VITE_BASE_URL;
    const userData = useSelector((state) => state.auth.user);
    const userlikedCategories = userData?.data?.user?.likedCategories || [];
    const [categories, setCategories] = useState([]);
    console.log(userData);

    console.log('user liked categories are: ', userlikedCategories);

    
        const fetchingCategoriesByid = async () => {
            try {
                const fetchedCategories = [];
                for (let index = 0; index < userlikedCategories.length; index++) {
                    const categoryId = userlikedCategories[index];
                    const response = await axios.get(`${url}category/category/${categoryId}`);
                    fetchedCategories.push(response.data);
                    console.log('response from backend ',response);
                }
                console.log('fetchedCategories are: ',fetchedCategories);
                setCategories(fetchedCategories);
            } catch (error) {
                console.log('There seems to be an error in fetching categories by Id', error);
            }
        };

    useEffect(() => {
        fetchingCategoriesByid();
    }, [ userlikedCategories, url]);

    return (
        <div className=" w-64 rounded-xl ml-8 my-2  bg-[#13181d] shadow-2xl">
            {/* <h1>Liked Categories</h1> */}
            {categories.length > 0 ? (
                <ul className=" py-2">
                    {categories.map((category, index) => (
                        
                        <div className="flex gap-2 my-1 ">
                        
                        <li className="rounded-full"><img className="rounded-full h-8 w-8 object-cover"src={category?.data?.media} alt={category?.data?.name}/></li>
                        <li className="mt-1 text-sm text-slate-100" key={index}>{category?.data?.name}</li>
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
