import { getDaos } from "../models/daos/factory.js"
import { UpdateProductDTO } from "../models/dtos/products.dto.js"
import { GetTicketDTO, AddTicketDTO } from "../models/dtos/tickets.dto.js"
import { HTTP_STATUS, HttpError } from "../utils/api.utils.js"
import { LogColors } from "../utils/console.utils.js"

const { ticketsDao, cartsDao, productsDao } = getDaos()

class TicketsService {
    async getTickets() {
        const tickets = await ticketsDao.getTickets()
        const ticketsPayloadDTO = []

        tickets.forEach(ticket => {
            ticketsPayloadDTO.push(new GetTicketDTO(ticket))
        })

        return ticketsPayloadDTO
    }

    async getTicketById(tid) {

        if (!tid) {
            throw new HttpError('Missing param', HTTP_STATUS.BAD_REQUEST)
        }

        const ticket = await ticketsDao.getTicketById(tid)

        if (!ticket) {
            throw new HttpError('Ticket not found', HTTP_STATUS.NOT_FOUND)
        }

        const ticketPayloadDTO = new GetTicketDTO(ticket)
        return ticketPayloadDTO
    }

    async createTicket(cid, purchaser) {

        if (!cid) {
            throw new HttpError('Missing param', HTTP_STATUS.BAD_REQUEST)
        }

        const cart = await cartsDao.getCartById(cid)

        if (!cart) {
            throw new HttpError('Cart not found', HTTP_STATUS.NOT_FOUND)
        }

        const { products } = cart

        if (!Object.keys(products).length) {
            throw new HttpError('Cart is empty', HTTP_STATUS.BAD_REQUEST)
        }

        let totalPrice = 0
        const ticketProducts = []
        const abortedProducts = []

        await products.forEach(async item => {
            if (item.quantity > item.product.stock) {
                abortedProducts.push(item)
                LogColors.logYellow('No stock for product: ', item.product.title);
            } else {
                ticketProducts.push(item)
                totalPrice += item.quantity * item.product.price
                await cartsDao.removeFromCart(cid, item.product._id)
                const updateProductPayload = {}
                updateProductPayload.stock = item.product.stock - item.quantity

                if (updateProductPayload.stock === 0) {
                    updateProductPayload.status = false
                }

                const productPayloadDTO = new UpdateProductDTO(updateProductPayload)
                await productsDao.updateProductById(item.product._id, productPayloadDTO)
                LogColors.logYellow(`Item [${item.product.title}] deleted from cart [${cid}]`);
            }
        })
        if (!totalPrice) {
            throw new HttpError('Not enough stock for purchase any product', HTTP_STATUS.BAD_REQUEST)
        }
        const ticketPayloadDTO = new AddTicketDTO(purchaser, totalPrice, ticketProducts)
        const newTicket = await ticketsDao.createTicket(ticketPayloadDTO)
        return { newTicket, abortedProducts, cart }
    }

    async updateTicket(tid, payload) {
        if (!tid || !payload || !Object.keys(payload).length) {
            throw HttpError('Any payload or id provided for the ticket', HTTP_STATUS.BAD_REQUEST)
        }

        const ticket = await ticketsDao.getTicketById(tid)

        if (!ticket) {
            throw new HttpError('Ticket not found', HTTP_STATUS.NOT_FOUND)
        }

        const updatedTicket = await ticketsDao.updateTicketById(tid, payload)
        return updatedTicket
    }

    async deleteTicket(tid) {

        if (!tid) {
            throw HttpError('No ticket id', HTTP_STATUS.BAD_REQUEST)
        }

        const deletedTicket = await ticketsDao.deleteTicket(tid)
        return deletedTicket
    }
}

export default TicketsService