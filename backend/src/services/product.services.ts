import Product from "../model/product.model";
import productData from "../types/product.types";
 class ProductService {
    async create(productData:Omit<productData, 'id'>) {
        try {
            const product =await Product.create(productData)
            return product
        } catch (error: any) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
}
export default ProductService