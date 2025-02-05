import Product from "../model/product.model";
import productData from "../types/product.types";
class ProductService {
    async create(productData: Omit<productData, 'id'>): Promise<productData | null> {
        try {
            const product = await Product.create(productData)
            return product.get()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async getProduct(productId: string): Promise<productData | null> {
        try {
            const product = await Product.findByPk(productId)
            if (!product) {
                throw new Error("Product Not Found")
            }
            return product.get()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async updateProductService(productId: string, productData: Partial<productData>): Promise<productData | null> {
        try {
            const product = await Product.findByPk(productId)
            if (!product) {
                throw new Error("Product Not Found")
            }
            const newProduct = await product.update(productData)
            return newProduct.get()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
export default ProductService