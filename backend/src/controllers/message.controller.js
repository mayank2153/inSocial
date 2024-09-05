
import {Message} from '../models/message.model.js';
import {Conversation} from '../models/conversation.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

export const sendMessage = async (req, res) => {
    const { conversationId, sender, content } = req.body;
    
    try {
        const message = new Message({ conversationId, sender, content });
        await message.save();
        
        // Update conversation's last message 
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: message._id
        });
        return res.status(201).json(
            new ApiResponse(201,"Message sent successfully")
        );
    } catch (error) {
        throw new ApiError(500,"Error Sending message",error)
    }
};

export const getMessages = async (req, res) => {
    
    
    const { conversationId } = req.params;
     

    try {
        const messages = await Message.find({ conversationId }).populate('sender', 'username');
        return res.status(200).json(
            new ApiResponse(200,messages,"Messages fetched successfully")
        );
    } catch (error) {
        throw new ApiError(500,"Error fetching messages");
    }
};
