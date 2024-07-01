import express from 'express';
import { deleteUser, signin, signup, test, update } from '../controllar/user.controllar.js';

const route = express.Router();
route.get("/" , test);
route.post("/signup" , signup);
route.post("/signin" , signin);
route.post("/update" , update);
route.delete("/deleteUser" , deleteUser);

export default route ;