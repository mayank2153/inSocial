import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import ConnectDB from './config/db.js';
dotenv.config(
  {
      path: '.env'
  }
)
const app = express();
app.get("/",(req,res)=>{
    res.send("WhisperHub")
})

const PORT = process.env.PORT || 8000;

ConnectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log('listening on port '+process.env.PORT)
    })
})
.catch((err)=>console.error("MONGO DB error: " + err))