import productModel from '../../schemas/product.model.js'

export class ProductsMongoDAO {
    async getProducts({ limit, page, query, sort }) {
        let filter = {}

        if (!query) {
            filter = {}
        } else if (query === true) {
            filter = { status: true }
        } else if (query === false) {
            filter = { status: false }
        } else {
            filter = { category: query }
        }

        const options = {
            sort: (sort ? { price: sort } : {}),
            limit: limit || 10,
            page: page || 1,
            lean: true
        }

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