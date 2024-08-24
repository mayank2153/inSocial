import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostByUser from "../homepage/postByUser/postByUser";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const username = user?.data?.user?.userName;
  console.log(user);
  useEffect(() => {
    console.log('UserProfile component mounted');
    console.log('User Data:', user);
    setUserData(user);
  }, [user]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full bg-[rgb(13,17,20)]  overflow-y-scroll no-scrollbar max-h-screen flex flex-col items-center">
      <div className="bg-[#13181d] shadow-md lg:max-w-[650px] max-w-[350px] lg:min-h-[400px] rounded-lg mt-8 border-2 border-gray-600  min-h-[300px]">
        <div className="relative bg-[#0d1114] lg:w-[480px] lg:min-w-[595px] w-[345px] h-[100px] lg:h-[150px] rounded-t-lg"> 
          {
            (user?.data?.user?.coverImage) ? 
            <img src={userData?.data?.user?.coverImage}  className="h-[150px] w-full object-cover rounded-t-lg"/>
            :
            null
            
          }
          
        </div>

        <div className="flex gap-10">
          <div className="relative h-24 w-24 rounded-full bg-black ml-4 -mt-12 z-1">
            <img src={userData?.data?.user?.avatar} alt="avatar" className="h-24 w-24 rounded-full object-cover"/>
          </div>
          <div className="text-slate-200 -ml-6 mt-3 font-mono text-xl">
            <span>{userData?.data?.user?.userName}</span>
          </div>
        </div>

        <div>
          <div className="w-full text-slate-200 mt-8 border-b-2 border-gray-600">
            <span className="ml-2 text-slate-400 font-mono text-xl">Bio</span>
          </div>
          <div className="text-white my-2 mx-2 text-sm">
            <span>{userData?.data?.user?.bio}</span>
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-600 w-full mt-10">
          <span className="text-slate-300 ml-40 text-xl">Posts</span>
        </div>
      <div>
        
        <div>
          <PostByUser />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
