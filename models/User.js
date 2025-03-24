import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true
    }
}, {
    _id: false
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    number: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: addressSchema,
        required: true
    }
});

export const User = mongoose.model("User", userSchema);