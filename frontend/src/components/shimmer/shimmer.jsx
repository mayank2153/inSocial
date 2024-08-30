// import ShimmerCard from "../shimmer/shimmerCard.jsx"
import ShimmerPost from "./shimmerPose.jsx"
export const Shimmer=()=>{
    return(
        <div className="w-full bg-[#0d1114] flex justify-center flex-col items-center">
            <ShimmerPost/>
            <ShimmerPost/>
            <ShimmerPost/>
            <ShimmerPost/>
        </div>
    )
}
export default Shimmer