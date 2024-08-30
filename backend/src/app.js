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
import { Notification } from './models/notification.model.js';

// Initialize the Express app and HTTP server
const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

// Debug log for CORS origin
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);

// CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure this is correctly set in your environment
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all methods that will be used
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Handle preflight requests for all routes
app.options('*', cors());

// Middlewares
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: 'None', // Set to 'None' to allow cross-site cookies
        httpOnly: true, // Enhance security by restricting access to cookies
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import voteRouter from "./routes/vote.routes.js";
import categoryRouter from "./routes/category.routes.js";
import searchRouter from "./routes/search.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import notificationRouter from './routes/notification.route.js';
import authRouter from './routes/auth.route.js';

// Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/vote", voteRouter);
app.use("/category", categoryRouter);
app.use("/search", searchRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.use("/notification", notificationRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

// Default Route
app.get("/", (req, res) => {
    res.send("WHISPERHUB");
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinConversation', async (conversationId) => {
        socket.join(conversationId);

        try {
            // Fetch past messages for this conversation and emit them to the user
            console.log('socket cid', conversationId);
            const messages = await getMessages(conversationId);
            socket.emit('conversationMessages', messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    });

    socket.on('sendMessage', async (messageData) => {
        try {
            // Emit the message to all users in the conversation room
            console.log(messageData.content);
            io.to(messageData.conversationId).emit('receiveMessage', messageData);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Notification on someone liking a post
    socket.on('likePost', async(data) => {
        try {
            console.log('Notification data before saving', data);
            const notificationData = {
                actor: data.actor,
                type: 'like',
                message: data.message,
                postId: data.postId,
                receiver: data.receiver
            };
            console.log('notificationData:', notificationData);
            const savedNotification = await Notification.create(notificationData);
            console.log('Notification saved:', savedNotification);
            io.emit('notification', notificationData);
        } catch (error) {
            console.log('Error processing like post notification:', error);
            socket.emit('error', { message: 'Error processing like post notification' });
        }
    });

    // Notification on commenting a post
    socket.on('commentPost', async(data) => {
        try {
            console.log('Notification data before saving', data);
            const notificationData = {
                actor: data.actor,
                type: 'comment',
                message: data.message,
                postId: data.postId,
                receiver: data.receiver
            };
            console.log('notificationData:', notificationData);
            const savedNotification = await Notification.create(notificationData);
            console.log('Notification saved:', savedNotification);
            io.emit('notification', notificationData);
        } catch (error) {
            console.log('Error processing comment post notification:', error);
            socket.emit('error', { message: 'Error processing comment post notification' });
        }
    });

    // Notification on replying to a comment
    socket.on('ReplyComment', async(data) => {
        try {
            console.log('Notification data before saving', data);
            const notificationData = {
                actor: data.actor,
                type: 'Reply',
                message: data.message,
                postId: data.postId,
                receiver: data.receiver
            };
            console.log('notificationData:', notificationData);
            const savedNotification = await Notification.create(notificationData);
            console.log('Notification saved:', savedNotification);
            io.emit('notification', notificationData);
        } catch (error) {
            console.log('Error processing reply comment notification:', error);
            socket.emit('error', { message: 'Error processing reply comment notification' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, server }; // Export both app and server
