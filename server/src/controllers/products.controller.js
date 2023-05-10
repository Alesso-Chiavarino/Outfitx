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


}

export default ProductsController