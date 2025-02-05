import Product from "../model/product.model";
import productData from "../types/product.types";
export default class productService {
    async create(productData:Omit<productData, 'id'>) {
        try {
            const product = Product.create(productData)
            return product
        } catch (error: any) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
}