import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { fetchCategories } from "../../api/fetchAllCategories";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { MdDriveFolderUpload } from "react-icons/md";
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

const url = import.meta.env.VITE_BASE_URL || `http://localhost:8000/`;

const Previews = ({ setFormData, initialMedia }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (initialMedia) {
            if (typeof initialMedia === 'string') {
                setFiles([{ url: initialMedia }]);
            } else {
                setFiles([initialMedia]);
            }
        }
    }, [initialMedia]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            setFormData(prevData => ({
                ...prevData,
                media: acceptedFiles[0],
                removeMedia: false, // Reset removeMedia flag when a new image is dropped
            }));
        },
        onDropRejected: rejectedFiles => {
            console.error("Rejected Files:", rejectedFiles);
        }
    });

    const handleDelete = () => {
        setFiles([]);
        setFormData(prevData => ({
            ...prevData,
            media: null,
            removeMedia: true, // Set removeMedia flag when deleting an image
        }));
    };

    const thumbs = files.map(file => (
        <div className="relative inline-flex rounded border border-gray-300 mb-2 mr-2 p-1 box-border min-w-max" key={file.name || file.url || file}>
            <button onClick={handleDelete} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">X</button>
            <div className="flex min-w-0 overflow-hidden">
                <img
                    src={file.preview ? file.preview : file.url}
                    className="block w-auto h-24"
                    onLoad={() => { file.preview && URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => file.preview && URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container h-max min-w-max">
            <div {...getRootProps({ className: 'dropzone' })} className={`p-4 rounded cursor-pointer w-full ${files.length ? 'hidden' : ''}`}>
                <div className='flex items-center gap-2'>
                    <p>Drag and Drop images or </p>
                    <MdDriveFolderUpload />
                </div>
                <div>
                    <input {...getInputProps()} className="-z-10" />
                </div>
            </div>
            <aside className="flex flex-wrap mt-4 w-full">
                {thumbs}
            </aside>
        </section>
    );
};


const PostForm = ({ isEdit }) => {
    const [categories, setCategories] = useState([]);
    const currentUser = useSelector((state) => state.auth.user?.data?.user?._id);
    const [selectedColor, setSelectedColor] = useState('#13181d'); 
    const [selectSize, setSelectSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { postId } = useParams();

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        description: "",
        owner: "",
        media: null,
    });

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setFormData(prevData => ({
                ...prevData,
                owner: currentUser,
            }));
        }
    }, [currentUser]);

    useEffect(() => {
        if (isEdit && postId) {
            const fetchPost = async () => {
                try {
                    const { data } = await axios.get(`${url}posts/getPost/${postId}`, {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    console.log("data is isEdit?",data)
                    setFormData({
                        category: data.data.category,
                        title: data.data.title,
                        description: data.data.description,
                        owner: data.data.owner,
                        media: data.data.media,
                    });
                } catch (error) {
                    console.error("Error fetching post", error);
                }
            };
            fetchPost();
        }
    }, [isEdit, postId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        // Update selected color if category changes
        if (name === "category") {
            const selectedCategory = categories.find(category => category.name === value);
            if (selectedCategory) {
                setSelectedColor(selectedCategory.color);
            } else {
                setSelectedColor('#13181d'); // Reset to default if no category is selected
            }
        }
        setSelectSize(1);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            const response = isEdit
                ? await axios.post(`${url}posts/update-post/${postId}`, formData, { withCredentials: true })
                : await axios.post(`${url}posts/create-post`, data, { withCredentials: true });
            navigate("/");
            setLoading(false);
            toast.success("Post created/updated successfully");
        } catch (error) {
            setLoading(false);
            toast.error("Error creating/updating post");
            console.error(error);
        }
    };
    

    return (
        <div className="w-full flex justify-center lg:py-8 bg-[#13181d] min-h-[100vh] overflow-y-scroll no-scrollbar">
            <div className="flex flex-col items-center bg-[#0d1114] rounded-2xl max-h-[100vh] text-white px-6 py-5 md:px-10 md:py-8 gap-4 w-full max-w-[600px]">
                <h1 className="text-2xl md:text-3xl">{isEdit ? "Edit Post" : "Create Post"}</h1>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col text-lg md:text-2xl gap-6 md:gap-8 w-full">
                        <div className='lg:max-h-20 overflow-auto no-scrollbar max-h-20'>
                            <select 
                                name="category" 
                                id="category" 
                                onChange={handleChange} 
                                value={formData.category}
                                className="w-min md:w-min rounded-xl text-sm md:text-xl py-2 px-2 md:py-1 focus:outline-none"
                                style={{ backgroundColor: selectedColor }}
                            >
                                <option value="" disabled className='bg-[#13181d]'>Select Category</option>
                                {categories.map(category => (
                                    <option 
                                        key={category._id} 
                                        value={category.name} 
                                        style={{ backgroundColor: "#13181d" }}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Title"
                            className="min-h-16 px-2 py-2 text-slate-300 bg-transparent border-t-2 border-t-gray-600 focus:outline-none"
                        />

                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="min-h-16 px-2 py-4 text-slate-300 bg-transparent border-t-2 border-t-gray-600 focus:outline-none"
                        />

                        <Previews setFormData={setFormData} initialMedia={formData.media} />

                        <button
                            type="submit"
                            className="w-[175px] p-2 flex items-center justify-center font-mono h-[45px] md:min-h-[45px] bg-blue-500 rounded-2xl text-slate-200 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? <ClipLoader size={20} color="black" /> : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
