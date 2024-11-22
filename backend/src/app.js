// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { Server } from 'socket.io';
import { createServer } from 'http';
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
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
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
import mailRouter from './routes/mail.route.js';

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
app.use("/api/contact", mailRouter);

app.use(errorHandler);

// Default Route
app.get("/", (req, res) => {
    res.send("WHISPERHUB");
});

// Socket.io Connection
io.on('connection', (socket) => {

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
            io.to(messageData.conversationId).emit('receiveMessage', messageData);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Notification on someone liking a post
    socket.on('likePost', async(data) => {
        try {
            const notificationData = {
                actor: data.actor,
                type: 'like',
                message: data.message,
                postId: data.postId,
                receiver: data.receiver
            };
            console.log('Notification data:', notificationData);
            const savedNotification = await Notification.create(notificationData);
            io.emit('notification', notificationData);
            io.to(data.receiver).emit('receiveLike',notificationData);
            
        } catch (error) {
            console.error('Error processing like post notification:', error);
            socket.emit('error', { message: 'Error processing like post notification' });
        }
    });

    // Notification on commenting a post
    socket.on('commentPost', async(data) => {
        try {
            const notificationData = {
                actor: data.actor,
                type: 'comment',
                message: data.message,
                postId: data.postId,
                receiver: data.receiver
            };
            const savedNotification = await Notification.create(notificationData);
            io.emit('notification', notificationData);
        } catch (error) {
            console.error('Error processing comment post notification:', error);
            socket.emit('error', { message: 'Error processing comment post notification' });
        }
    });

    // Notification on replying to a comment
    socket.on('ReplyComment', async(data) => {
        try {
            const notificationData = {
                actor: data.actor,
                type: 'Reply',
                message: data.message,
                postId: data.postId,
                receiver: data.receiver
            };
            const savedNotification = await Notification.create(notificationData);
            io.emit('notification', notificationData);
        } catch (error) {
            console.error('Error processing reply comment notification:', error);
            socket.emit('error', { message: 'Error processing reply comment notification' });
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


export { app, server }; // Export both app and server
