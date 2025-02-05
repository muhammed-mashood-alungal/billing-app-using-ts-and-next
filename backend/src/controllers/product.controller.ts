import { Request, Response } from "express";
import ProductService from "../services/product.services";
import productData from "../types/product.types";
export default class ProductController {

    constructor(private productService: ProductService) { }

    createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.body)
            const productData = req.body
            await this.productService.create(productData)
            res.status(201).json({ success: true, message: "Created Successfully" })
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message || "Something Went Wrong" })
        }
    }
    getProductData = async (req: Request, res: Response): Promise<void> => {
        try {
            const productId = req.params.productId
            if (!productId) {
                throw new Error("Product Is Not Defined")
            }
            const product = await this.productService.getProduct(productId)
            res.status(201).json({ success: true, message: "Fethced Successfully"  , productData : product})
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ success: false, message: error.message || "Something Went Wrong" })
        }
    }
    updateProductData = async (req: Request, res: Response): Promise<void> => {
        try {
            const productId = req.params.productId
            const productData : Partial<productData> = req.body
            if (!productId) {
                throw new Error("Product Is Not Defined")
            }
            const product = await this.productService.updateProductService(productId,productData)
            res.status(201).json({ success: true, message: "Updated Successfully"  , productData : product})
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message || "Something Went Wrong" })
        }
    }
    getAllProdcuts = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.productService.getAllProductsService()
            res.status(201).json({ success: true, message: "Fetched Successfully"  , products : products})
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message || "Something Went Wrong" })
        }
    }
    deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productId = req.params.productId
            if (!productId) {
                throw new Error("Product Is Not Defined")
            }
            await this.productService.deleteProductService(productId)
            res.status(201).json({ success: true, message: "Deleted Successfully"})
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message || "Something Went Wrong" })
        }
    }
    
    
}
