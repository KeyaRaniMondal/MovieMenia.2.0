import express from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';

const app=express();
dotenv.config();

const PORT=process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    connectToDB();
    console.log(`server is running on port http://localhost:${PORT}`)
})