import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import ConnectDB from './config/db.js';
import { app } from './app.js';
dotenv.config(
  {
      path: '.env'
  }
)


ConnectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port '+process.env.PORT)
    })
})
.catch((err)=>console.error("MONGO DB error: " + err))