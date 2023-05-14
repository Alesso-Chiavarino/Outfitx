import { ProductsService } from "../services/products.service.js"
import { successResponse, HTTP_STATUS } from "../utils/api.utils.js"

const productsService = new ProductsService()

class ProductsController {

    static async getProducts(req, res, next) {

        const filter = req.query

        try {
            const products = await productsService.getProducts(filter)
            const response = successResponse(products)
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async getProduct(req, res, next) {
        const { id } = req.params

        try {
            const product = await productsService.getProductById(id)
            const response = successResponse(product)
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async createProduct(req, res, next) {

        const payload = req.body
        const { files } = req 

        try {
            const newProduct = await productsService.createProduct(payload, files)
            const response = successResponse(newProduct)
            res.status(HTTP_STATUS.CREATED).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next) {
        const { id } = req.params
        const payload = req.body

        try {
            const updatedProduct = await productsService.updateProductById(id, payload)
            const response = successResponse(updatedProduct)
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        const { id } = req.params

        try {
            const productToDelete = await productsService.deleteProductById(id)
            const response = successResponse(productToDelete)
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }


}

export default ProductsController