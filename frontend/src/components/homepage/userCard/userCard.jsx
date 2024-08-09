const UserCard=({avatar,bio,userName,_id})=>{
    return(
        <div className="min-h-20 border-b-2 border-gray-600 py-2 px-4 hover:bg-gray-900 hover:cursor-pointer">
            <div className="owner-info flex items-center mb-4 gap-4">
              <img
                src={avatar}
                alt={`Avatar of ${userName}`}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div className="text-[16px] text-slate-200">{userName}</div>
                <div className="text-sm text-slate-200">{bio}</div>

              </div>
            </div>
        </div>
    )
}
export default UserCard