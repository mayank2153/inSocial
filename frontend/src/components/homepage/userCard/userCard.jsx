import { createConversation } from "../../../api/createConversation";
import { useDispatch, useSelector } from "react-redux";
import { FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { openChat } from "../../../utils/chatSlice.jsx";

const UserCard = ({ avatar, bio, userName, _id,inChat=false }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.user);
    console.log("user:",userData)
    const userId = userData.data.user?userData?.data?.user?._id:userData?.data?._id;
    const isOpenChat = useSelector((state) => state.chat.isOpen);
    console.log(isOpenChat);
    

    const handleCreateConversation = async () => {
        try {
            const conversation = await createConversation({ participants: [_id, userId] });
            // onClick(conversation);
            dispatch(openChat());
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="min-h-6  py-2 px-4 hover:bg-gray-900 hover:cursor-pointer">
            <div className="owner-info flex items-center mb-4 gap-4">
                <Link to={`/UserProfile/${_id}`}>
                    <img
                        src={avatar}
                        alt={`Avatar of ${userName}`}
                        className="w-10 h-10 rounded-full mr-2 border-2 border-black"
                    />
                </Link>
                <div>
                    
                        <div className="text-[16px] font-mono text-slate-200">{userName}</div>
                    
                    <div className="text-sm text-gray-500 font-mono ">{bio}</div>
                </div>
                <button onClick={handleCreateConversation} className={`ml-auto text-white px-2 py-1 rounded ${inChat?'hidden':'block'}`}>
                    <FaRegPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default UserCard;
