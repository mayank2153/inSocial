import ShimmerCard from "../shimmer/shimmerCard.jsx"
export const Shimmer=()=>{
    return(
        <div className="w-full bg-[#0d1114] flex justify-center flex-col items-center max-h-screen overflow-y-scroll">

            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
        </div>
    )
}
export default Shimmer