import { Router } from "express";
import ProductService from '../services/product.services'
import ProductController from "../controllers/product.controller";
const productRouter = Router()

const productService = new ProductService();
const productController = new ProductController(productService);

productRouter.post('/', productController.createProduct);
productRouter.get('/:productId',productController.getProductData)
productRouter.put('/:productId',productController.updateProductData)

export  default productRouter