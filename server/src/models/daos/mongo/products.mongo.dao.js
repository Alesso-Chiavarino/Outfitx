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
        await productModel.create(payload)
        const newProduct = {
            status: payload.status || true,
            thumbnails: payload.thumbnails || [],
            ...payload
        }
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