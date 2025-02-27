import mongoose from "mongoose";

const config = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log("Error in connecting to MongoDb",error)
    }
}

export default config;