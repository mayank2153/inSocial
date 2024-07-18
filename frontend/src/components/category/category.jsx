import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const ShowCategories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${url}category/category`);
            if (response.data.success) {
                const fetchedCategories = response.data.categories;
                console.log(fetchedCategories);
                setCategories(fetchedCategories);
            }
        } catch (error) {
            console.log('There seems to be an error in fetching Categories :', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="bg-[#1e0832] w-1/6 h-screen fixed shadow-xl mt-20 overflow-y-scroll">
            <div className="mt-8 border-b-2 border-slate-500 pb-4">
               
                <h1 className="text-slate-300 flex items-center gap-4 text-xl ml-4">
                    <FaHome /> Home
                </h1>
            </div>
            <div className="mt-8 border-b-2 border-slate-500 pb-4">
                <h1 className="text-2xl text-center text-slate-300">Categories</h1>
                <ul className="mt-6 ml-4">
                    {categories.map((category) => (
                        <Link to={`/posts/category/${category._id}`} key={category._id}>
                        
                            <li className="mt-3 text-slate-300" key={category._id}>
                                {category.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ShowCategories;
