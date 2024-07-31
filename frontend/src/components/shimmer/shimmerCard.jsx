const ShimmerCard = () => {
    return (
        <div className="bg-[#13181d] shadow-md w-[500px] max-h-[500px] min-w-[600px] rounded-lg py-4 min-h-[300px] border-b">
            <div className="owner flex py-4 px-8 gap-10">
                <div className="rounded-full min-w-[50px] aspect-square animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%]">
                </div>
                <div className="rounded-xl min-w-[200px] min-h-[50px] animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%]">
                </div>
            </div>
            <div className="post flex flex-col gap-10">
                <div className="rounded-xl max-w-[500px] min-h-[50px] ml-10 animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%]">
                </div>
                <div className="rounded-xl max-w-[500px] min-h-[200px] ml-10 animate-shimmerAnimation bg-gradient-to-r from-transparent via-[#2e2b2b] to-transparent bg-[length:200%_100%]">
                </div>
            </div>
        </div>
    )
}

export default ShimmerCard;
