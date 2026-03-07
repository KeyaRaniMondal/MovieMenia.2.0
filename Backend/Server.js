//force dns to use ipv4 addresses
import server from 'node:dns/promises' //for esm modules
// const ser=require('node:dns/promises')  for common.js
server.setServers(['1.1.1.1','8.8.8.8'])

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


