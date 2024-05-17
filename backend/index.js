import express from 'express';
import mongoose from 'mongoose';
const app = express();
app.get("/",(req,res)=>{
    res.send("WhisperHub")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});