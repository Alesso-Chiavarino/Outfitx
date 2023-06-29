import productModel from '../../schemas/product.model.js'

export class ProductsMongoDAO {
    async getProducts(filter, options) {
        const products = await productModel.paginate(filter, options)
        return products
    }

    async getProductById(id) {
        const product = await productModel.findById(id)
        return product
    }

    async createProduct(payload) {
        const newProduct = await productModel.create(payload)
        return newProduct
    }

    async updateProductById(id, payload) {
        const updatedProduct = await productModel.findByIdAndUpdate(id, payload, { new: true })
        return updatedProduct
    }

    async deleteProductById(id) {
        const deletedProduct = await productModel.findByIdAndDelete(id)
        return deletedProduct
    }
}