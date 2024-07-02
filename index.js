import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoute from './routes/user.routes.js';
import useProduct from './routes/shop.routes.js';
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.listen(3001 , ()=>{
    console.log(`Server is running on port 3000`);
});
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected");
}).catch((err)=> console.log(err));
app.get("/" , (req,res)=>{
    res.cookie('name' , 'ashes' , {maxAge: 60000 * 60 * 2});
     res.status(201).send("Welcome to MERN backend");
});
app.use("/user" , useRoute);
app.use("/product" , useProduct);