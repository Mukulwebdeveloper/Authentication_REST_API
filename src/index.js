import dotenv from "dotenv"
import app from "./app.js"
import db from "./config/db.js"
import colors from "colors"

dotenv.config();

const port = process.env.PORT || 3000


db().then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`.bgGreen);
})
}).catch((error)=>{
    console.log("MongoDb connection Error",error);
    
})



