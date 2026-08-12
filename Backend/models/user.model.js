import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    avatar: { type: String, default: null },
}, { timestamps: true });


userSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User
