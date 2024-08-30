import React from 'react';

const ShimmerPost = () => {
    return (
        <div className="animate-pulse bg-[#13181d] shadow-md w-[500px] max-h-[500px] min-w-[600px] rounded-lg py-4 min-h-[300px] border-b border-gray-700 flex flex-col justify-between p-4">
            {/* Title Shimmer */}
            <div className="h-8 w-3/4 bg-gray-700 mb-4 rounded"></div>
            {/* Subtitle Shimmer */}
            <div className="h-4 w-1/2 bg-gray-700 mb-4 rounded"></div>
            {/* Image/Content Shimmer */}
            <div className="h-48 w-full bg-gray-700 mb-4 rounded"></div>
            {/* Text Shimmers */}
            <div className="h-4 w-full bg-gray-700 mb-2 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-700 mb-2 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-700 mb-2 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
        </div>
    );
};

export default ShimmerPost;
