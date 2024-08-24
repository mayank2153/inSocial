import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../api/fetchAllCategories";
const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;
import { useSelector } from "react-redux";

const ShowCategories = () => {
    const [categories, setCategories] = useState([]);

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

    
    return isAuthenticated ? (
        <div className=" bg-[#0d1114]  h-screen  shadow-xl overflow-y-scroll no-scrollbar border-r border-gray-600">
            <div className="mt-8 border-b-2 border-gray-600 pb-4">
                <Link to="/">
                    <h1 className="text-slate-300 flex items-center gap-2 pl-20 text-xl">
                        <FaHome /> Home
                    </h1>
                </Link>
                
            </div>
            <div className="mt-2 border-b-2 border-slate-500 pb-4">
                <h1 className="text pl-20 text-slate-400">Categories</h1>
                <ul className="mt-3  pl-20">
                    {categories.map((category) => (
                        <Link to={`/posts/category/${category._id}`} key={category._id}>
                        
                        <div className="flex gap-2 mb-4 ml-4">
                        
                        <li className="rounded-full"><img className="rounded-full h-8 w-8 object-cover"src={category.media} alt={category.name}/></li>
                        <li className="mt-1 text-sm text-slate-100" key={category._id}>{category.name}</li>
                        </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    ) : (null);
}

export default ShowCategories;
