"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_services_1 = __importDefault(require("../services/product.services"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const productRouter = (0, express_1.Router)();
const productService = new product_services_1.default();
const productController = new product_controller_1.default(productService);
productRouter.get('/', productController.getAllProdcuts);
productRouter.post('/', productController.createProduct);
productRouter.get('/:productId', productController.getProductData);
productRouter.put('/:productId', productController.updateProductData);
productRouter.delete('/:productId', productController.deleteProduct);
exports.default = productRouter;
