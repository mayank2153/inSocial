import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div>   
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ShowCategories;
