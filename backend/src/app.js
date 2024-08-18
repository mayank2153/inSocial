// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { Server } from 'socket.io';
import { createServer } from 'http';
import "./middlewares/googleauth.middleware.js";
import "./middlewares/discordauth.middleware.js";
import { sendMessage, getMessages } from './controllers/message.controller.js'; // Assuming you have these controllers

const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import voteRouter from "./routes/vote.routes.js";
import categoryRouter from "./routes/category.routes.js";
import searchRouter from "./routes/search.routes.js
import errorHandler from "./middlewares/errorHandler.middleware.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/vote", voteRouter);
app.use("/category", categoryRouter);
app.use("/search", searchRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);

app.use(errorHandler)
app.get("/", (req, res) => {
    res.send("WHISPERHUB");
});


io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinConversation', async (conversationId) => {
        socket.join(conversationId);

        try {
            // Fetch past messages for this conversation and emit them to the user
            const messages = await getMessages(conversationId);
            socket.emit('conversationMessages', messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    });

    socket.on('sendMessage', async (messageData) => {
        try {
            

            // Emit the message to all users in the conversation room
            console.log(messageData.content)
            io.to(messageData.conversationId).emit('receiveMessage', messageData);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});



export { app, server }; // Export both app and server
