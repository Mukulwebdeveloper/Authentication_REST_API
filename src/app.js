import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"


const app = express();


// Middelware
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());


app.use("/api/user", authRouter);

app.use("/", (req,res)=>{
    res.send("Hello World")
})

export default app;