import { Schema, model } from "mongoose";

const collection = 'users'

const schema = new Schema({
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
        type: String,
        unique: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'premium'],
        default: 'user',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts',
        required: true
    },
    profile_pic: {
        type: Object
    },
    documents: {
        type: [
            {
                name: String,
                reference: String,
                doctype: {
                    type: String,
                    enum: ['id', 'address', 'account_status']
                }
            }
        ]
    },
    last_connection: {
        type: Date,
        default: Date.now()
    }
})

export const userModel = model(collection, schema)