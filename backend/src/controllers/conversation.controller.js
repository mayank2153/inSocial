
import {Conversation} from '../models/conversation.model.js';
import { User } from "../models/user.model.js"
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
export const createConversation = async (req, res) => {
    const { participants } = req.body;

    try {
        const existingConversation = await Conversation.findOne({
            participants: { $all: participants }
        });

        if (existingConversation) {
            return res.status(200).json(
                new ApiResponse(200, existingConversation, "Conversation already exists")
            );
        }
        const conversation = new Conversation({ participants });
        await conversation.save();
        await Promise.all(
            participants.map(async (participantId) => {
                await User.findByIdAndUpdate(participantId,{
                    $push: { conversations: conversation._id }
                })
            })
        )
        return res.status(201).json(
            new ApiResponse(201,conversation,"Conversation Successfully created")
        )
    } catch (error) {
        throw new ApiError(500,"Error Creating Conversation:",error);
    }
};

export const getConversations = async (req, res) => {
    const { userId } = req.params;

    try {
        const conversations = await Conversation.find({ participants: userId }).populate('participants');
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
