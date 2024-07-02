import mongoose from 'mongoose';

const ShopSchema = new mongoose.Schema({
    productName: {type: String , unique: true , required: true},
    productPrice: {type: Number ,  required: true},
    productDescription: {type: String },
    productImage: {type:String}
   
});

const Shopitems = mongoose.model("Shopitems" , ShopSchema);
export default Shopitems;