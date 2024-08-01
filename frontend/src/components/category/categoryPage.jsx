import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const userData = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // console.log(userData);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}category/category`);
      if (response.data.success) {
        const fetchedCategories = response.data.categories;
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

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      // If category is already selected, remove it
      setSelectedCategories(selectedCategories.filter((id) => id !== category._id));
    } else {
      // If category is not selected, add it
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${url}users/add-liked-categories`,
        {
          userId: userData?.data?.user?._id,
          categoryIds: selectedCategories
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
  
      console.log(response);
    } catch (error) {
      console.log('error:', error);
    }
  };
  

  return  (
    <div className="w-full h-[100vh] bg-[#0d1114] flex items-center justify-center">
      <div className=" bg-slate-100 w-fit  mt-10 mb-10 h-screen rounded overflow-y-scroll no-scrollbar">
      {categories.length > 0 && (
        <>
          <div>
            <h1 className="text-black text-xl flex justify-center pt-4">Categories</h1>
            <p className="text-black pl-4 pt-4 font-mono">Please Select the categories you like:</p>
          </div>
          <div className="pt-7 grid grid-cols-2 gap-4 pl-2 pr-2 pb-7 overflow-y-scroll">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`max-w-sm rounded-lg overflow-hidden shadow-lg h-28 flex cursor-pointer hover:shadow-xl hover:shadow-black  ${selectedCategories.includes(category._id) ? 'border-2 border-green-500' : ''}`}
                style={{ backgroundColor: `${category.color}33` }}
                onClick={() => handleCategorySelect(category._id)}
              >
                <img className="h-20 w-20 rounded-full object-cover pt-2 pl-2" src={category.media} alt="Category Image" />
                <div className="px-6 py-4">
                  <div className="font-mono text-black text-sm mb-1">{category.name}</div>
                  <p className="text-gray-700 font-serif text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 pb-7 flex justify-center">
            <Link to = "/">
            <button onClick={handleSubmit} className="bg-[#0d1114] text-white my-2 px-8 py-2 rounded hover:bg-[#13181d] focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
            </Link>
            
          </div>
        </>
      )}
    </div>
    </div>
    
  )  ;
}

export default CategoryPage;
