import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../homepage/userCard/userCard";
import ChatComponent from "./chatComponent"; 
const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null); // State to track selected conversation
    const userData = useSelector((state) => state.auth.user);
    const ownerID = userData?.data?.user?._id;

    const fetchConversations = async () => {
        try {
            const response = await axios.get(`${url}conversations/${ownerID}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log("fetched conversations:",response.data)
            setConversations(response.data);
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw new Error('Error fetching conversations');
        }
    }

    useEffect(() => {
        if (ownerID) {
            fetchConversations();
        }
    }, [ownerID]);

    const handleUserCardClick = (conversation) => {
        setSelectedConversation(conversation); // Set the selected conversation
    };

    return (
        <div className="text-white max-h-screen overflow-y-scroll no-scrollbar">
            {selectedConversation ? (
                <ChatComponent
                    conversationId={selectedConversation._id}
                    userId={ownerID}
                    receiver={selectedConversation.participants.filter(participant => participant._id !== ownerID)}
                />
            ) : (
                conversations.length > 0 ? (
                    <ul>
                        {conversations.map((conversation) => (
                            <li key={conversation._id}>
                                <h3>{conversation.title}</h3>
                                <ul>
                                    {conversation.participants
                                        .filter(participant => participant._id !== ownerID)
                                        .map(filteredParticipant => (
                                            <li key={filteredParticipant._id}>
                                                <div onClick={() => handleUserCardClick(conversation)}>
                                                    <UserCard key={filteredParticipant._id} {...filteredParticipant} />
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No conversations found.</p>
                )
            )}
        </div>
    );
}

export default Conversations;
