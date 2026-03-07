import mongoose from "mongoose";

export async function connectToDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected: ", conn.connection.host);
    }
    catch (error) {
        console.log("Error connecting to DB", error);
    }
}



// // 
// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected:', conn.connection.host);
//   } catch (err) {
//     console.error('MongoDB connection failed', err);
//     process.exit(1);
//   }
// };

// export default connectDB;