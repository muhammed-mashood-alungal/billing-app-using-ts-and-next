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
class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const productData = req.body;
                yield this.productService.create(productData);
                res.status(201).json({ success: true, message: "Created Successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: error.message || "Something Went Wrong" });
            }
        });
        this.getProductData = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                res.status(500).json({ success: false, message: error.message || "Something Went Wrong" });
            }
        });
        this.updateProductData = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                res.status(500).json({ success: false, message: error.message || "Something Went Wrong" });
            }
        });
        this.getAllProdcuts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getAllProductsService();
                res.status(201).json({ success: true, message: "Fetched Successfully", products: products });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message || "Something Went Wrong" });
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.productId;
                if (!productId) {
                    throw new Error("Product Is Not Defined");
                }
                yield this.productService.deleteProductService(productId);
                res.status(201).json({ success: true, message: "Deleted Successfully" });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message || "Something Went Wrong" });
            }
        });
    }
}
exports.default = ProductController;
