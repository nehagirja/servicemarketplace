import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
    },
    address: {
        type: String,
    },
    pin: {
        type: Number,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    role: {
        type: String,
        required: true, // Example: "admin", "user", "moderator"
    },
    hourly_rate:{
        type: Number,
    },
    service_type: {
        type: String,
    },
    business_name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
    profileImage: {
        type: String,
    }
});

const UsersModel = mongoose.model('User', usersSchema);

export default UsersModel;
