import { CartsService } from "../services/carts.service.js"
import { successResponse, HTTP_STATUS } from "../utils/api.utils.js"
import TicketsService from "../services/tickets.service.js"
import { MercadoPagoService } from "../services/mercadopago.service.js"
import MailsService from "../services/mails.service.js"

const cartsService = new CartsService()
const ticketsService = new TicketsService()
const mercadoPagoService = new MercadoPagoService()
const mailsService = new MailsService()

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
        const { user } = req
        try {
            const amount = +req.body?.amount || 1
            const addedProduct = await cartsService.addToCart(id, pid, amount, user)
            req.logger.info(`product ${pid} added to cart ${id}`)
            const response = successResponse(addedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async removeFromCart(req, res, next) {
        const { cid, pid } = req.params

        try {
            const updatedCart = await cartsService.removeFromCart(cid, pid)
            const response = successResponse(updatedCart)
            req.logger.info('Product removed from cart successfully')
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async updateCart(req, res, next) {
        const { cid } = req.params
        const payload = req.body
        try {
            const updatedCart = await cartsService.updateCart(cid, payload)
            const response = successResponse(updatedCart)
            req.logger.info(`cart ${cid} updated`)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCart(req, res, next) {
        const { id } = req.params

        try {
            const deletedCart = await cartsService.deleteCart(id)
            const response = successResponse(deletedCart)
            req.logger.info('Cart deleted successfully')
            res.status(HTTP_STATUS.OK).json(response)

        } catch (err) {
            next(err)
        }
    }

    static async checkout(req, res, next) {
        const { cid } = req.params

        try {
            const { products } = await cartsService.getCartById(cid)

            if (!products.length) {
                throw new Error('Cart is empty')
            }

            const uriPoint = await mercadoPagoService.checkout(products, cid)
            const response = successResponse(uriPoint)
            console.log(response)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async purchase(req, res, next) {
        const purchaser = req.user
        const { cid } = req.params

        try {
            const ticket = await ticketsService.createTicket(cid, purchaser)

            if (!ticket) {
                throw new Error('Ticket could not be created')
            }

            await mailsService.sendOrderConfirmation(purchaser, ticket)
            req.logger.info(`Successful purchase`)
            const response = successResponse(ticket)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
}