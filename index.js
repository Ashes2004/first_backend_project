import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoute from './routes/user.routes.js';
import useProduct from './routes/shop.routes.js';
import cookieParser from "cookie-parser";
import session from "express-session";
import User from "./model/user.model.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    session({
           secret: "ashes das",
           saveUninitialized:false,
           resave:false,
           cookie:{
            maxAge:60000 * 60 ,

           } ,
        
}));

const port = process.env.PORT || 3001;

app.listen( port , ()=>{
    console.log(`Server is running on port ${port}`);
});
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database connected");
}).catch((err)=> console.log(err));
app.get("/" , (req,res)=>{
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('name' , 'ashes' , {maxAge: 60000 * 60 * 2});
     res.status(201).send("Welcome to MERN backend");
});
app.use("/user" , useRoute);
app.use("/product" , useProduct);

app.get('/user/status' , (req , res)=>{
  return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg: "NOt Authenticated"});
})