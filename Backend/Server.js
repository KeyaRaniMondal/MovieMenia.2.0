//force dns to use ipv4 addresses
import server from 'node:dns/promises' //for esm modules
// const ser=require('node:dns/promises')  for common.js
server.setServers(['1.1.1.1', '8.8.8.8'])

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db.js';
import User from './models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({origin: process.env.Client_URL,credentials: true})); // Enable CORS for all routes
app.use(express.json());//middleware to parse json data from request body
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 5000;

// signup route
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    //   console.log("Received signup data:", { username, email, password });
    try {
        if (!username || !email || !password) {
            throw new Error("All fields are required")
        }
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username is taken, try anotheer one" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword
        })

        //jwt token creation and sending it as a cookie to the client
        if (userDoc) {
            const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "5d" })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
        }
        res.status(200).json({ user: userDoc, message: "User created successfully" });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }

})

// login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const userDoc = await User.findOne({ username })
        if (!userDoc) {
            return res.status(400).json({ message: "Invalid username or password" })
        }
        const isPasswordValid = await bcrypt.compareSync(
            password,
            userDoc.password
        )
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }
        if (userDoc) {
            const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "5d" })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
        }
        res.status(200).json({ user: userDoc, message: "User LoggedIn successfully" });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// route to fetch user data based on the token sent in the cookie
app.get("/api/fetch-user", async (req, res) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(200).json({ user: null })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(200).json({ user: null })
        }
        const userDoc = await User.findById(decoded.id).select("-password")
        if (!userDoc) {
            return res.status(200).json({ user: null })
        }
        res.status(200).json({ user: userDoc })
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//for logout we will just clear the token cookie on the client side
app.post("/api/logout", (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ message: "Logged out successfully" })
})

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
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


