import mongoose from "mongoose"

const connectdb = async(req,res)=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("Successful connected DB".bgYellow);
       
    } catch (error) {
        console.log("Connection error", error)
    }
}

export default connectdb;