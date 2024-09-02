import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../utils/categoryslice";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const likedCategories_redux = useSelector((state) => state.likedCategories?.likesCategory);
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}category/category`);
      if (response.data.success) {
        const fetchedCategories = response.data.categories;
        setCategories(fetchedCategories);
      }
      // console.log(response)
    } catch (error) {
      console.error('There seems to be an error in fetching Categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    // console.log("category",categories)
  }, []);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}users/add-liked-categories`,
        {
          userId: userData?.data.user?userData?.data?.user?._id : userData?.data?._id,
          categoryIds: selectedCategories
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      // console.log(response);

      // Dispatch the addCategories action to update the Redux store
      dispatch(addCategory(selectedCategories));
      setLoading(false);
      toast.success('Category Added Successfully')
      navigate('/');

    } catch (error) {
      console.error('error:', error);
      toast.error('Error Adding Category')
    }
  };

  return (
    <div className="w-full h-[100vh] bg-[#0d1114] flex items-center justify-center pt-12 pb-20 text-white  no-scrollbar">
      <div className=" w-fit mt-10 mb-10 h-screen rounded overflow-y-scroll  no-scrollbar">
        {categories.length > 0 && (
          <>
            <div>
              <h1 className=" text-xl flex justify-center pt-4">Categories</h1>
              <p className=" pl-4 pt-4 font-mono">Please Select the categories you like:</p>
            </div>
            <div className="pt-7 grid grid-cols-2 gap-4 pl-2 pr-2 pb-7 overflow-y-scroll  no-scrollbar">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`max-w-sm rounded-lg overflow-hidden shadow-lg lg:h-28 px-1  py-1 lg:py-0 flex cursor-pointer hover:shadow-xl hover:shadow-black  ${selectedCategories.includes(category._id) ? 'border-2 border-green-500' : ''}
                    ${likedCategories_redux.some(liked => liked.categoryId === category._id) ? 'border-2 border-green-500' : ''}`}
                  style={{ backgroundColor: `${category.color}78` }}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  <img className="h-20 w-20 rounded-full object-cover lg:pt-2 lg:pl-2" src={category.media} alt="Category Image" />
                  <div className="lg:px-6 py-4 px-2">
                    <div className="font-mono text-sm mb-1">{category.name}</div>
                    <p className="text-[#cdd5db] font-serif text-sm hidden lg:block">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-7 flex justify-center">
              <Link to="/">
                <button onClick={handleSubmit} className="bg-blue-500 text-white my-2 px-8 py-2  hover:bg-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
