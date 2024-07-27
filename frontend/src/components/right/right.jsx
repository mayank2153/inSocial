import React from "react"
import { useSelector } from "react-redux"


const Right=()=>{
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? (
        <div className="min-w-80 bg-[#1e0832] min-h-[100vh] h-full border-l-2 border-black">
            <h1 className="pt-20">
                I am right🫡
            </h1>
        </div>
    ) : null
}
export default Right