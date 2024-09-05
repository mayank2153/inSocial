import axios from "axios";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const UploadCoverImage = async (userId, formData) => {
  try {
    const res = await axios.post(`${url}users/upload-cover-image/${userId}`,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  } catch (error) {
    console.error("Problem occurred while uploading CoverImage", error);
  }
};
