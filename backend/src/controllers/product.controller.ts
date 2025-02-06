import { NextFunction, Request, Response } from "express";
import ProductService from "../services/product.services";
import productData from "../types/product.types";
import { AppError } from "../middlewares/error.middleware";

export default class ProductController {

    constructor(private productService: ProductService) { }

    createProduct = async (req: Request, res: Response , next : NextFunction): Promise<void> => {
        try {
            console.log(req.body)
            const productData = req.body
            await this.productService.create(productData)
            res.status(201).json({ success: true, message: "Created Successfully" })
        } catch (error: any) {
            console.log(error)
            next(new AppError(error.message || "Something Went Wrong", 500))
        }
    }
    getProductData = async (req: Request, res: Response , next: NextFunction): Promise<void> => {
        try {
            const productId = req.params.productId
            if (!productId) {
                throw new Error("Product Is Not Defined")
            }
            const product = await this.productService.getProduct(productId)
            res.status(201).json({ success: true, message: "Fethced Successfully"  , productData : product})
        } catch (error: any) {
            console.log(error)
            next(new AppError(error.message || "Something Went Wrong", 500))
        }
    }
    updateProductData = async (req: Request, res: Response ,next : NextFunction): Promise<void> => {
        try {
            const productId = req.params.productId
            const productData : Partial<productData> = req.body
            if (!productId) {
                throw new Error("Product Is Not Defined")
            }
            const product = await this.productService.updateProductService(productId,productData)
            res.status(201).json({ success: true, message: "Updated Successfully"  , productData : product})
        } catch (error: any) {
            next(new AppError(error.message || "Something Went Wrong", 500))
        }
    }
    getAllProdcuts = async (req: Request, res: Response ,next: NextFunction ): Promise<void> => {
        try {
            const products = await this.productService.getAllProductsService()
            res.status(201).json({ success: true, message: "Fetched Successfully"  , products : products})
        } catch (error: any) {
            next(new AppError(error.message || "Something Went Wrong", 500))
        }
    }
    deleteProduct = async (req: Request, res: Response , next : NextFunction): Promise<void> => {
        try {
            const productId = req.params.productId
            if (!productId) {
                throw new Error("Product Is Not Defined")
            }
            await this.productService.deleteProductService(productId)
            res.status(201).json({ success: true, message: "Deleted Successfully"})
        } catch (error: any) {
            next(new AppError(error.message || "Something Went Wrong", 500))
        }
    }
    
    
}
