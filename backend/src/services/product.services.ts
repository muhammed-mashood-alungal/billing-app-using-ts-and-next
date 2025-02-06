import { Op } from "sequelize";
import Product from "../model/product.model";
import productData from "../types/product.types";
class ProductService {
    async create(productData: Omit<productData, 'id'>): Promise<productData | null> {
        try {
            const isExist  = await Product.findOne({
                where: { code: productData.code},
              })
              if(isExist){
                throw new Error('The Product with this code already exists')
              }
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
            const isExist  = await Product.findOne({
                where: { 
                    code: productData.code,
                    id : {[Op.ne] : productId}
                }
              })
              if(isExist){
                throw new Error('The Product with this code already exists')
              }
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
    async getAllProductsService(): Promise<productData[] | null> {
        try {
            const products = await Product.findAll()
            if (products.length === 0) {
                return null
            }
            return products
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async deleteProductService(productId: string): Promise<void> {
        try {
            const deletedCount = await Product.destroy({
                where: {
                    id: productId,
                },
            })

            if (deletedCount === 0) {
                throw new Error('Product not found')
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
}
export default ProductService