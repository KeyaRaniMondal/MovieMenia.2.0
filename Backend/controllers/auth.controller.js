import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyGoogleIdToken } from "../config/firebase.config.js";

const createTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "5d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username is taken, try another one" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        createTokenAndSetCookie(userDoc._id, res);

        res.status(201).json({ user: userDoc, message: "User created successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // allow users to sign in with either their username or email
        const userDoc = await User.findOne({
            $or: [{ username }, { email: (username || "").toLowerCase() }],
        });
        if (!userDoc) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, userDoc.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        createTokenAndSetCookie(userDoc._id, res);

        res.status(200).json({ user: userDoc, message: "User LoggedIn successfully" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchUser = async (req, res) => {
    const { token } = req.cookies;

    // not logged in - return null instead of an error so the client
    // does not log a 401 on every page load
    if (!token) {
        return res.status(200).json({ user: null });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userDoc = await User.findById(decoded.id).select("-password");
        res.status(200).json({ user: userDoc || null });
    } catch (error) {
        res.status(200).json({ user: null });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

const sanitizeUsername = (name, email) => {
    const base = (name || email.split("@")[0])
        .replace(/[^a-zA-Z0-9_.]/g, "_")
        .toLowerCase();
    return base || "user";
};

export const googleLogin = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: "Google ID token is required" });
    }

    try {
        const decodedToken = await verifyGoogleIdToken(idToken);
        const { email, name, picture, email_verified } = decodedToken;

        if (!email) {
            return res.status(400).json({ message: "Google account has no email" });
        }
        if (!email_verified) {
            return res.status(400).json({ message: "Google email is not verified" });
        }

        let userDoc = await User.findOne({ email });

        if (!userDoc) {
            // Google users have no password; store a random hash so the field stays required
            const randomPassword = await bcrypt.hash(
                Math.random().toString(36).slice(2) + Date.now().toString(36),
                10
            );

            let username = sanitizeUsername(name, email);
            if (await User.findOne({ username })) {
                username = `${username}_${Math.random().toString(36).slice(2, 8)}`;
            }

            userDoc = await User.create({
                username,
                email,
                password: randomPassword,
                provider: "google",
                avatar: picture || null,
            });
        }

        createTokenAndSetCookie(userDoc._id, res);

        res.status(200).json({ user: userDoc, message: "Logged in with Google successfully" });
    } catch (error) {
        console.error("Error during Google login:", error);
        res.status(500).json({
            message: "Google authentication failed",
            error: error.message,
        });
    }
};
