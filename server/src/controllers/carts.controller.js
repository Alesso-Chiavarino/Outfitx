import { CartsService } from "../services/carts.service.js"
import { successResponse, HTTP_STATUS } from "../utils/api.utils.js"

const cartsService = new CartsService()

export class CartsController {
    static async getCarts(req, res, next) {
        try {
            const carts = await cartsService.getCarts()
            const response = successResponse(carts)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async getCart(req, res, next) {

        const { id } = req.params

        try {
            const cart = await cartsService.getCartById(id)
            const response = successResponse(cart)
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async createCart(req, res, next) {
        try {
            const cart = await cartsService.createCart()
            const response = successResponse(cart)
            req.logger.info('Cart created successfully')
            res.status(HTTP_STATUS.CREATED).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async clearCart(req, res, next) {

        const { id } = req.params

        try {
            const emptyCart = await cartsService.clearCart(id)
            const response = successResponse(emptyCart)
            req.logger.info('Cart cleared successfully')
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async addToCart(req, res, next) {
        const { id, pid } = req.params
        const amount = +req.body?.amount || 1

        try {
            const updatedCart = await cartsService.addToCart(id, pid, amount)
            const response = successResponse(updatedCart)
            req.logger.info('Product added to cart successfully')
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async removeFromCart(req, res, next) {
        const { id, pid } = req.params

        try {
            const updatedCart = await cartsService.removeFromCart(id, pid)
            const response = successResponse(updatedCart)
            req.logger.info('Product removed from cart successfully')
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }
}