import { Router } from "express";
import productService from '../services/product.services'
import ProductController from '../controllers/product.controller'
const productRouter = Router()

const productController = new ProductController(new productService)
productRouter.post('/',productController.createProduct)

export  default productRouter