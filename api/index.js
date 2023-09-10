import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()
app.use(cors()) // Use this after the variable declaration
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})
dotenv.config()

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect to mongo DB!")

    } 
    catch (error) {
        handleError(error);
        
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

// app.get("/api/hotels", (req,res) => {
//     res.send("hello first request")
// })

//middlewares
app.use(cookieParser())
app.use(express.json())






app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message: errorMessage,
        stack:err.stack,
    })
})


app.listen(8800, () =>{
    connect()
    console.log("connect!")
})