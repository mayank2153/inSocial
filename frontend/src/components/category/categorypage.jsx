import React, { useEffect, useState } from "react";
import axios from "axios";

const Categorypage = () => {
    const url = import.meta.env.VITE_BASE_URL;
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${url}category/category`);
            if (response.data.success) {
                const fetchedCategories = response.data.categories; // Adjusted to correctly access categories
                console.log(fetchedCategories);
                setCategories(fetchedCategories);
            }
        } catch (error) {
            console.log('There seems to be an error in fetching Categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        categories.length > 0 ? (
            <div className="bg-black w-1/2 ml-72 mt-40">
                <div>
                    <h1 className="text-white text-xl ml-72 pt-4">Categories</h1>
                    <p className="text-white pl-4 pt-4 font-mono">Please Select the categories you like:</p>
                </div>
                <div className="pt-7 grid grid-cols-2 gap-4 pl-2 pr-2"> {/* Added grid and grid-cols-2 */}
                    {categories.map((category) => (
                        <div key={category.id} className="max-w-sm rounded overflow-hidden shadow-lg h-28 flex bg-white">
                            <img className="h-20 w-20 rounded-full object-cover pt-2 pl-2" src={category.media} alt="Category Image" />
                            <div className="px-6 py-4">
                                <div className="font-mono text-black text-xl mb-2">{category.name}</div>
                                <p className="text-gray-700 font-serif text-base">
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : null
    );
}

export default Categorypage;
