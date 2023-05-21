import { Schema, model } from "mongoose";

const collection = 'users'

const schema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number
    },
    github_login: {
        type: String
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts',
        required: true
    },
    profile_pic: {
        type: Object
    }
})

export const userModel = model(collection, schema)