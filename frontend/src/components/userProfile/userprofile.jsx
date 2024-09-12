import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // Use Redux to get logged-in user info
import PostByUser from "../homepage/postByUser/postByUser";
import { useParams } from "react-router-dom";
import { fetchOwnerDetails } from "../../api/fetchOwnerDetails";  
import UserProfileShimmer from "../shimmer/userShimmer";
import { MdOutlineEdit } from "react-icons/md";
import { UploadCoverImage } from "../../api/UploadCoverImage";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { editUserDetails } from "../../api/editUserDetails";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isCoverHovering, setIsCoverHovering] = useState(false);
  const [isAvatarHovering, setIsAvatarHovering] = useState(false);
  const { userId } = useParams();  // Get userId from the URL
  const [formData, setFormData] = useState({
    coverImage: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Get the logged-in user from Redux store (assuming you store user data there)
  const loggedInUser = useSelector((state) => state.auth.user); 

  const fetchUserData = async () => {
    try {
      const response = await fetchOwnerDetails(userId);
      setUserData(response);
    } catch (error) {
      console.error('Error while fetching user data', error);
    }
  };

  const handleCoverImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, coverImage: files[0] });
    }
  };

  const handleAvatarImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, avatar: files[0] });
    }
  };

  useEffect(() => {
    if (formData.coverImage) {
      const uploadCoverImage = async () => {
        setIsLoading(true);
        try {
          await UploadCoverImage(userId, formData);
          toast.success('Cover Image Uploaded Successfully');
          fetchUserData();
        } catch (error) {
          toast.error('Error uploading cover image');
        } finally {
          setIsLoading(false);
        }
      };
      uploadCoverImage();
    }
  }, [formData.coverImage, userId]);

  useEffect(() => {
    if (formData.avatar) {
      const uploadAvatarImage = async () => {
        setIsLoading(true);
        try {
          await editUserDetails(userId, formData);
          toast.success('Avatar Uploaded Successfully');
          fetchUserData();
        } catch (error) {
          toast.error('Error uploading avatar');
        } finally {
          setIsLoading(false);
        }
      };
      uploadAvatarImage();
    }
  }, [formData.avatar, userId]);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return (
      <div className="bg-black items-center flex justify-center h-[100vh]">
        <UserProfileShimmer />
      </div>
    );
  }

  const isCurrentUser = loggedInUser && loggedInUser?.data?.user?._id === userId;

  return (
    <div className="w-full bg-[rgb(13,17,20)] overflow-y-scroll no-scrollbar max-h-screen flex flex-col items-center h-screen">
      <div className="bg-[#13181d] shadow-md lg:max-w-[650px] max-w-[350px] lg:min-h-[400px] rounded-lg mt-8 border-2 border-gray-600 min-h-[300px]">
        {/* Cover Image Section */}
        <div
          className="relative bg-[#0d1114] lg:w-[480px] lg:min-w-[595px] w-[345px] h-[100px] lg:h-[150px] rounded-t-lg overflow-hidden"
          onMouseEnter={() => setIsCoverHovering(true)}
          onMouseLeave={() => setIsCoverHovering(false)}
        >
          {userData.coverImage && (
            <img
              src={userData.coverImage}
              className="h-full w-full object-cover rounded-t-lg"
              alt="Cover"
            />
          )}

          {/* Conditionally render edit button and file input for cover image */}
          {isCurrentUser && isCoverHovering && (
            <div className="absolute inset-0 flex justify-end bg-black bg-opacity-50">
              <label htmlFor="coverImageInput" className="cursor-pointer">
                <MdOutlineEdit className="text-gray-500 text-2xl" />
              </label>
              <input
                type="file"
                id="coverImageInput"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
              />
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <FaSpinner className="animate-spin text-white text-2xl" />
            </div>
          )}
        </div>

        {/* Avatar Section */}
        <div className="flex gap-10 rounded-full">
          <div 
            className="relative h-24 w-24 rounded-full bg-black ml-4 -mt-12 z-1"
            onMouseEnter={() => setIsAvatarHovering(true)}
            onMouseLeave={() => setIsAvatarHovering(false)}
          >
            <img src={userData.avatar} alt="avatar" className="h-24 w-24 rounded-full object-cover" />

            {/* Conditionally render edit button and file input for avatar */}
            {isCurrentUser && isAvatarHovering && (
              <div className="absolute inset-0 flex justify-end bg-black bg-opacity-0">
                <label htmlFor="avatarInput" className="cursor-pointer">
                  <MdOutlineEdit className="text-gray-500 text-2xl mr-[5px] mt-[5px]" />
                </label>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarImageChange}
                />
              </div>
            )}
          </div>
          <div className="text-slate-200 -ml-6 mt-3 font-mono text-xl">
            <span>{userData.userName}</span>
          </div>
        </div>

        <div>
          <div className="w-full text-slate-200 mt-8 border-b-2 border-gray-600">
            <span className="ml-2 text-slate-400 font-mono text-xl">Bio</span>
          </div>
          <div className="text-white my-2 mx-2 text-sm">
            <span>{userData.bio}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full lg:max-w-[650px] max-w-[350px] lg:min-h-[400px]">
        <div className="border-gray-600 w-full mt-10 flex justify-center border-b-2">
          <p className="text-slate-300 text-xl">Posts</p>
        </div>

        <div>
          <PostByUser />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
