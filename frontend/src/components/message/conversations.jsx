import axios from "axios";
import { useEffect, useState } from "react"; // Import useState
import { useSelector } from "react-redux";
import UserCard from "../homepage/userCard/userCard";
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const userData = useSelector((state) => state.auth.user);
    const ownerID = userData?.data?.user?._id;

    const fetchConversations = async () => {
        try {
            const response = await axios.get(`${url}conversations/${ownerID}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(response.data)
            setConversations(response.data); // Update state with fetched conversations
            console.log(conversations)
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw new Error('Error fetching conversations');
        }
    }

    useEffect(() => {
        if (ownerID) {
            fetchConversations();
        }
    }, [ownerID]); // Add ownerID as a dependency

    return (
        <div className="text-white">
            {conversations.length > 0 ? (
                <ul>
                    {conversations.map((conversation) => (
                        <li key={conversation._id}>
                            <h3>{conversation.title}</h3>
                            <ul>
                                {conversation.participants
                                    .filter(participant => participant._id !== ownerID)
                                    .map(filteredParticipant => (
                                        <li key={filteredParticipant._id}>
                                            <UserCard key={filteredParticipant._id} {...filteredParticipant}/>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No conversations found.</p>
            )}
        </div>
    );
}

export default Conversations;
