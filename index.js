import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoute from './routes/user.routes.js';
dotenv.config();
const app = express();

app.use(express.json());
app.listen(3000 , ()=>{
    console.log(`Server is running on port 3000`);
});
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected");
}).catch((err)=> console.log(err));

app.use("/user" , useRoute);