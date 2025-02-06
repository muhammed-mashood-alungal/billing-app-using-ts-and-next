"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../middlewares/error.middleware");
class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const productData = req.body;
                yield this.productService.create(productData);
                res.status(201).json({ success: true, message: "Created Successfully" });
            }
            catch (error) {
                console.log(error);
                next(new error_middleware_1.AppError(error.message || "Something Went Wrong", 500));
            }
        });
        this.getProductData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                if (!productId) {
                    throw new Error("Product Is Not Defined");
                }
                const product = yield this.productService.getProduct(productId);
                res.status(201).json({ success: true, message: "Fethced Successfully", productData: product });
            }
            catch (error) {
                console.log(error);
                next(new error_middleware_1.AppError(error.message || "Something Went Wrong", 500));
            }
        });
        this.updateProductData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                const productData = req.body;
                if (!productId) {
                    throw new Error("Product Is Not Defined");
                }
                const product = yield this.productService.updateProductService(productId, productData);
                res.status(201).json({ success: true, message: "Updated Successfully", productData: product });
            }
            catch (error) {
                next(new error_middleware_1.AppError(error.message || "Something Went Wrong", 500));
            }
        });
        this.getAllProdcuts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getAllProductsService();
                res.status(201).json({ success: true, message: "Fetched Successfully", products: products });
            }
            catch (error) {
                next(new error_middleware_1.AppError(error.message || "Something Went Wrong", 500));
            }
        });
        this.deleteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                if (!productId) {
                    throw new Error("Product Is Not Defined");
                }
                yield this.productService.deleteProductService(productId);
                res.status(201).json({ success: true, message: "Deleted Successfully" });
            }
            catch (error) {
                next(new error_middleware_1.AppError(error.message || "Something Went Wrong", 500));
            }
        });
    }
}
exports.default = ProductController;
