import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const UploadCoverImage = async (userId, formData) => {
  try {
    // Initialize FormData
    console.log(formData);
    
    // const formData = new FormData();
    // formData.append("coverImage", coverImage); // 'coverImage' must match the name expected by your multer config
    // console.log(formData);
    
    // Make the POST request with the FormData
    const res = await axios.post(`${url}users/upload-cover-image/${userId}`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
  } catch (error) {
    console.error("Problem occurred while uploading CoverImage", error);
  }
};
