import { Request , Response } from "express";
import productService from "../services/product.services";
import productDataType from '../types/product.types'
export default class ProductController {
    private productService : productService; 
    constructor( service : productService ){
         this.productService  = service
    }
    async createProduct(req:Request , res:Response) : Promise<void>{
        try{
            const productData   = req.body
            this.productService.create(productData)
            res.status(201).json({success : true , message : "Created Successfully"})
        }catch(error : any){
            res.status(500).json({success:false , message : error.message || "Something Went Wrong"})
        }
        
    }
}
