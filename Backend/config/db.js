import mongoose from "mongoose";

export async function connectToDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected: ", conn.connection.host);
    }
    catch (error) {
        console.error("Error connecting to DB", error);
        process.exit(1);
    }
}
