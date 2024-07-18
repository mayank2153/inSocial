import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const ShowCategories = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${url}category/category`);
            if(response.data.success){
                const fetchedCategories = response.data.categories; // Adjusted to correctly access categories
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
        <>
        <div className="bg-[#1e0832] w-1/6 h-screen fixed shadow-xl" style={{height : ""}}>   
            <div className="justify-center mt-8 border-b-2 border-b-slate-500 ">
                <h1 className="text-slate-300 flex gap-4 text-xl ml-4 mb-4"><FaHome /> Home</h1>
            </div>
            <div className="mt-8 border-b-2 border-b-slate-500 ">
                <h1 className="text-2xl justify-center ml-14 text-slate-300">Categories</h1>
                <ul className="mt-6 ml-4 pb-2">
                    {categories.map((category) => (
                        <li className="mt-3 text-slate-300" key={category._id}>{category.name}</li>
                    ))}
                </ul>
            </div>
            
        </div>
        </>
        
    );
}

export default ShowCategories;
