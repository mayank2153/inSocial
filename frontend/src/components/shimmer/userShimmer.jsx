import React from "react";

const UserProfileShimmer = () => {
  return (
    <div className="w-full bg-[rgb(13,17,20)] overflow-y-scroll no-scrollbar max-h-screen flex flex-col items-center h-screen">
      <div className="bg-[#13181d] shadow-md lg:max-w-[650px] max-w-[350px] lg:min-h-[400px] rounded-lg mt-8 border-2 border-gray-600 min-h-[300px]">
        
        {/* Cover Image Placeholder */}
        <div className="relative bg-[#0d1114] lg:w-[480px] lg:min-w-[595px] w-[345px] h-[100px] lg:h-[150px] rounded-t-lg">
          <div className="w-full h-full bg-gray-700 rounded-t-lg animate-pulse"></div>
        </div>
        
        <div className="flex gap-10">
          {/* Avatar Placeholder */}
          <div className="relative h-24 w-24 rounded-full bg-gray-700 ml-4 -mt-12 z-1 animate-pulse">
            <div className="h-full w-full rounded-full bg-gray-600"></div>
          </div>
          
          {/* Username Placeholder */}
          <div className="bg-gray-700 h-6 w-36 rounded-md -ml-6 mt-6 animate-pulse"></div>
        </div>
        
        {/* Bio Section */}
        <div>
          <div className="w-full text-slate-200 mt-8 border-b-2 border-gray-600">
            <div className="ml-2 bg-gray-700 h-6 w-20 rounded-md animate-pulse"></div>
          </div>
          <div className="text-white my-2 mx-2 text-sm">
            <div className="bg-gray-700 h-4 w-full rounded-md mt-2 animate-pulse"></div>
            <div className="bg-gray-700 h-4 w-5/6 rounded-md mt-2 animate-pulse"></div>
            <div className="bg-gray-700 h-4 w-4/6 rounded-md mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileShimmer;
