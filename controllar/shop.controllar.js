import Shopitems from "../model/shop.model.js";

export const createProduct = async(req,res)=>{

 
    let shopitem = new Shopitems(req.body);
    try {
        await shopitem.save();
        return res.status(201).send({message: "product created sucessfully " , shopitem});
    } catch (error) {
        return res.status(400).send({error});
    }
}
export const getProduct = async(req , res)=>{
    try{ 	
        let product = await Shopitems.findOne({productName: req.params.name}) ;
        if(!product) return res.staus(404).send({error: "items not found"});
        return res.status(201).send({message:"item found " , product});
    }catch(error)
    {
        return res.status(400).send({error});
    }
}
export const updateProduct = async(req , res)=>{
    const {body} = req;
    try{ 	
        let product = await Shopitems.findOne({productName: req.params.name}) ;
        if(!product) return res.staus(404).send({error: "items not found"});
        await Shopitems.findByIdAndUpdate( product._id , {...body} , {new:true});
        return res.status(201).send({message:"item found and updated" });
    }catch(error)
    {
        return res.status(400).send({error});
    }
}
export const deleteProduct = async(req , res)=>{
    const {body} = req;
    try{ 	
        let product = await Shopitems.findOne({productName: req.params.name}) ;
        if(!product) return res.staus(404).send({error: "items not found"});
        await Shopitems.findByIdAndDelete( product._id );
        return res.status(201).send({message:"item found and deleted successfully"});
    }catch(error)
    {
        return res.status(400).send({error});
    }
}
export const getAllProduct = async(req , res)=>{
    
    try{ 	 
        console.log(req.headers.cookie);
        console.log(req.cookies);
        if(req.cookies.name && req.cookies.name === 'ashes'){
        let product = await Shopitems.find() ;
        if(!product) return res.staus(404).send({error: "items not found"});
        
        return res.status(201).send(product);
            }
            else{
                return res.status(400).send({message: "you need correct cookie"}); 
            }
    }catch(error)
    {
        return res.status(400).send({error});
    }
}
