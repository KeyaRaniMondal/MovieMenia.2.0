//force dns to use ipv4 addresses
import server from 'node:dns/promises' //for esm modules
// const ser=require('node:dns/promises')  for common.js
server.setServers(['1.1.1.1','8.8.8.8'])

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db.js';
import User from './models/User.js';

const app=express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());//middleware to parse json data from request body
dotenv.config();

const PORT=process.env.PORT || 5000;

app.post('/api/signup',async (req,res)=>{
  const {username,email,password}=req.body;
//   console.log("Received signup data:", { username, email, password });
try{
    if(!username || !email || !password){
        throw new Error("All fields are required")
    }
    const emailExists=await User.findOne({email});
    if(emailExists){
        return res.status(400).json({message:"Email already exists"})
    }

    const usernameExists=await User.findOne({username});
    if(usernameExists){
        return res.status(400).json({message:"Username is taken, try anotheer one"})
    }
    res.status(200).json({ message: "Signup successful", user: { username, email } });
}
  catch(error){
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    connectToDB();
    console.log(`server is running on port http://localhost:${PORT}`)
})





// const express = require("express");
// const cors=require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const PORT=process.env.PORT || 5000;
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());


