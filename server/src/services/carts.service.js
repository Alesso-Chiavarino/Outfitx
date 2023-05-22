import { getDaos } from "../models/daos/factory.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";

const { cartsDao, productsDao } = getDaos();

export class CartsService {
    async getCarts() {
        const carts = await cartsDao.getCarts()
        return carts
    }

    async getCartById(id) {
        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const cart = await cartsDao.getCartById(id)

        if (!cart) {
            throw new HttpError('Cart not found', HTTP_STATUS.NOT_FOUND)
        }

        return cart
    }

    async createCart() {
        const cart = await cartsDao.createCart()
        if (!cart) {
            throw new HttpError('Cart not created', HTTP_STATUS.INTERNAL_SERVER)
        }
        return cart
    }

    async deleteCartById(id) {
        const deletedCart = await cartsDao.deleteCartById(id)
        return deletedCart
    }

    async addToCart(id, productId, amount) {
        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const cart = await cartsDao.getCartById(id)

        if (!cart) {
            throw new HttpError('Cart not found', HTTP_STATUS.NOT_FOUND)
        }

        const product = await productsDao.getProductById(productId)

        if (!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        const updatedCart = await cartsDao.addToCart(id, productId, amount)

        return updatedCart
    }

    async removeFromCart(id, productId) {
        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const updatedCart = await cartsDao.removeFromCart(id, productId)

        return updatedCart
    }

    async clearCart(id) {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const cart = await cartsDao.getCartById(id)

        if (!cart) {
            throw new HttpError('Cart not found', HTTP_STATUS.NOT_FOUND)
        }

        const emptyCart = await cartsDao.clearCart(id)
        return emptyCart
    }

    async deleteCart(id) {
        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const cart = await cartsDao.getCartById(id)

        if (!cart) {
            throw new HttpError('Cart not found', HTTP_STATUS.NOT_FOUND)
        }

        const deletedCart = await cartsDao.deleteCart(id)
        return deletedCart
    }
}