import { Router } from "express";
import ProductService from '../services/product.services'
import ProductController from "../controllers/product.controller";
const productRouter = Router()

const productService = new ProductService();
const productController = new ProductController(productService);

productRouter.post('/', productController.createProduct);

export  default productRouter