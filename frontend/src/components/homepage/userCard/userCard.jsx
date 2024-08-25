import { createConversation } from "../../../api/createConversation";
import { useSelector } from "react-redux";
import { FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserCard = ({ avatar, bio, userName, _id }) => {
    const userData = useSelector((state) => state.auth.user);
    // console.log("user:",userData)
    const userId = userData?.data?.user?._id;
    // console.log(userId);

    // console.log(_id);
    

    const handleCreateConversation = async () => {
        try {
            const conversation = await createConversation({ participants: [_id, userId] });
            console.log('Conversation created:', conversation);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="min-h-6  py-2 px-4 hover:bg-gray-900 hover:cursor-pointer">
            <div className="owner-info flex items-center mb-4 gap-4">
                <img
                    src={avatar}
                    alt={`Avatar of ${userName}`}
                    className="w-10 h-10 rounded-full mr-2 border-2 border-black"
                />
                <div>
                    <Link to={`/UserProfile/${_id}`}>
                        <div className="text-[16px] font-mono text-slate-200">{userName}</div>
                    </Link>
                    
                    <div className="text-sm text-gray-500 font-mono ">{bio}</div>
                </div>
                <button onClick={handleCreateConversation} className="ml-auto text-white px-2 py-1 rounded">
                    <FaRegPaperPlane />
                </button>
            </div>
        </div>
    )
};

export default UserCard;
