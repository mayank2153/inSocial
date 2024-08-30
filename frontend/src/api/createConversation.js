import axios from "axios";

const url = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/';

export const createConversation = async ({ participants }) => {
    try {
        const conversation = await axios.post(`${url}conversations/`,
            { participants },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true 
            }
        );
        
        return conversation.data;
    } catch (error) {
        console.error('There seems to be an error in creating conversation: ' + error.message);
    }
}
