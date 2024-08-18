import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ConnectDB from './config/db.js';
import { app } from './app.js';
import { server } from './app.js'; // Import the server from app.js

dotenv.config({
    path: '.env'
});

ConnectDB()
.then(() => {
    server.listen(process.env.PORT, () => { // Use server.listen instead of app.listen
        console.log('Server listening on port ' + process.env.PORT);
    });
})
.catch((err) => console.error("MONGO DB error: " + err));
