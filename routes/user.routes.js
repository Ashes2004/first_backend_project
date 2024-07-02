import express from 'express';
import { deleteUser, findAll, signin, signup, test, update } from '../controllar/user.controllar.js';
import { updateProduct } from '../controllar/shop.controllar.js';

const route = express.Router();
route.get("/" , test);
route.post("/signup" , signup);
route.post("/signin" , signin);
route.post("/update" , update);
route.delete("/deleteUser" , deleteUser);
route.get("/data" , findAll);


export default route ;