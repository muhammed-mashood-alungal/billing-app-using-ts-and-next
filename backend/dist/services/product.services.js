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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../model/product.model"));
class ProductService {
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.create(productData);
                return product.get();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findByPk(productId);
                if (!product) {
                    throw new Error("Product Not Found");
                }
                return product.get();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateProductService(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findByPk(productId);
                if (!product) {
                    throw new Error("Product Not Found");
                }
                const newProduct = yield product.update(productData);
                return newProduct.get();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAllProductsService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_model_1.default.findAll();
                if (products.length === 0) {
                    return null;
                }
                return products;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteProductService(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCount = yield product_model_1.default.destroy({
                    where: {
                        id: productId,
                    },
                });
                if (deletedCount === 0) {
                    throw new Error('Product not found');
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = ProductService;
