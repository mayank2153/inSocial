import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostByUser from "../homepage/postByUser/postByUser";
import { useParams } from "react-router-dom";
// import { UserData } from "../../api/getUserbyId";
import { fetchOwnerDetails } from "../../api/fetchOwnerDetails";  
import UserProfileShimmer from "../shimmer/userShimmer";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const {userId}  = useParams();

  // const id = userId.userId;

  
  
  const fetchUserData = async() => {
    try {
      const response = await fetchOwnerDetails(userId); 
      
      setUserData(response);
       
    } catch (error) {
      console.error('seems to be an error while fetching user data', error);
      
    }
    // const response = await UserData(userId);

  }

  
useEffect(() => {
  fetchUserData();
},[userId]);
  



  if (!userData) {
    return <div className="bg-black items-center flex justify-center h-[100vh]">
        <UserProfileShimmer />
    </div>;
  }

  return (
    <div className="w-full bg-[rgb(13,17,20)]  overflow-y-scroll no-scrollbar max-h-screen flex flex-col items-center h-screen">
      <div className="bg-[#13181d] shadow-md lg:max-w-[650px] max-w-[350px] lg:min-h-[400px] rounded-lg mt-8 border-2 border-gray-600  min-h-[300px]">
        <div className="relative bg-[#0d1114] lg:w-[480px] lg:min-w-[595px] w-[345px] h-[100px] lg:h-[150px] rounded-t-lg"> 
          {
            (userData.coverImage) ? 
            <img src={userData?.coverImage}  className="h-[150px] w-full object-cover rounded-t-lg"/>
            :
            null
            
          }
          
        </div>

        <div className="flex gap-10">
        <div className="relative h-24 w-24 rounded-full bg-black ml-4 -mt-12 z-1">
            <img src={userData?.avatar} alt="avatar" className="h-24 w-24 rounded-full object-cover"/>
          </div>
          <div className="text-slate-200 -ml-6 mt-3 font-mono text-xl">
            <span>{userData?.userName}</span>
          </div>
        </div>

        <div>
        <div className="w-full text-slate-200 mt-8 border-b-2 border-gray-600">
            <span className="ml-2 text-slate-400 font-mono text-xl">Bio</span>
          </div>
          <div className="text-white my-2 mx-2 text-sm">
            <span>{userData?.bio}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full lg:max-w-[650px] max-w-[350px] lg:min-h-[400px]">
        <div className=" border-gray-600 w-full mt-10 flex justify-center border-b-2 ">
          <p className="text-slate-300  text-xl ">Posts</p>
        </div>

        <div>
          <PostByUser />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
