import mongoose, { Schema } from "mongoose";
import { type } from "os";

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 

    },
    name: {
        type: String,
        required: true, 

    },
    cartItems: {
        type: Array,
        default: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "food"
            }
        ]
    },
    otp: {
        type: Number,
        default: 0,
    },
})

export const User = mongoose.model("user", userSchema)
