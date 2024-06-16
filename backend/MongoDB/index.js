// backend/MongoDB/index.js
import {mongoose}  from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectToDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URL )
    console.log("Database Connected")

  } catch (error) {
    console.log(error)
  }
}

