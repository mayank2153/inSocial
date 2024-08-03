const LikedCategoriesShimmer = () => {
    console.log("shimmer");
    return (
        <div className="w-[280px] h-[160px] bg-[#13181d] rounded-xl ml-8 my-2 shadow-2xl overflow-hidden">
            <div className="mt-4 mx-2">
                <div className="py-2 -mt-1 w-full h-[30px] animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%] my-2 pl-2 rounded"></div>
                <div className="py-2 w-full h-[30px] animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%] my-2 pl-2 rounded mt-2"></div>
                <div className="py-2 w-full h-[30px] animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%] my-2 pl-2 rounded mt-2"></div>
                <div className="py-2 w-full h-[30px] animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%] my-2 pl-2 rounded mt-2"></div>
            </div>
        </div>
    );
};

export default LikedCategoriesShimmer;