import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllar/shop.controllar.js';
const route = express.Router();
route.post("/create" , createProduct);
route.get("/get" , getAllProduct);
route.get("/get/:name" , getProduct);
route.patch("/update/:name" , updateProduct);
route.delete("/delete/:name" , deleteProduct);

export default route;

