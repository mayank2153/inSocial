const UserCard=({avatar,bio,userName,_id})=>{
    return(
        <div className="min-h-20 border-t-2 border-slate-300 py-2 px-4 hover:bg-slate-300">
            <div className="owner-info flex items-center mb-4 gap-4">
              <img
                src={avatar}
                alt={`Avatar of ${userName}`}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div className="font-bold">{userName}</div>
                <div className="text-sm">{bio}</div>

              </div>
            </div>
        </div>
    )
}
export default UserCard