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

    async addToCart(cid, pid, amount, user) {
        if (!cid || !pid || !amount) {
            throw new HttpError('Missing required params', HTTP_STATUS.BAD_REQUEST)
        }
        const cart = await cartsDao.getCartById(cid)
        if (!cart) {
            throw new HttpError('Cart not found', HTTP_STATUS.NOT_FOUND)
        }
        const product = await productsDao.getProductById(pid)
        if (!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }
        if (product.stock < amount) {
            throw new HttpError('Insufficient stock for selected product', HTTP_STATUS.BAD_REQUEST)
        }
        if (product.owner === user.email) {
            throw new HttpError('Can not add own products', HTTP_STATUS.FORBIDDEN)
        }
        const existingProduct = cart.products.find(item => item.product.code === product.code)
        const existingProductIndex = cart.products.findIndex(item => item.product.code === product.code)
        let addedProduct
        if (existingProduct) {
            cart.products[existingProductIndex].quantity += amount
            addedProduct = await cartsDao.updateCart(cid, cart.products)
        } else {
            addedProduct = await cartsDao.addToCart(cid, pid, amount)
        }
        return addedProduct
    }

    async removeFromCart(cid, productId) {
        if (!cid) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const updatedCart = await cartsDao.removeFromCart(cid, productId)

        return updatedCart
    }

    async updateCart(cid, products){
        if(!cid){
            throw new HttpError('Missing param', HTTP_STATUS.BAD_REQUEST)
        }
        if(!products.length){
            throw new HttpError('Provide a cart payload, must be an array of products', HTTP_STATUS.BAD_REQUEST)
        }
        const cart = await cartsDao.updateCart(cid, products)
        return cart
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