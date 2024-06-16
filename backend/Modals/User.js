// backend/Models/User.js
import mongoose from"mongoose"

// getting users table data from clerk and below one user entry in db
const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },

    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique:true 
    },
    photo:{
        type:String
    },
 });
 export const User= mongoose.model("User",userSchema, 'users_info');