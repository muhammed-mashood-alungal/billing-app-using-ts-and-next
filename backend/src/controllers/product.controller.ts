import { Request , Response } from "express";
import ProductService from "../services/product.services";
export default class ProductController {

    constructor(private productService: ProductService) {}

     createProduct= async(req:Request , res:Response) : Promise<void> =>{
        try{
            console.log(req.body)
            const productData   = req.body
            await  this.productService.create(productData)
            res.status(201).json({success : true , message : "Created Successfully"})
        }catch(error : any){
            console.log(error)
            res.status(500).json({success:false , message : error.message || "Something Went Wrong"})
        }
        
    }
}
