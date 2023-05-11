import fs from 'fs/promises'
import { join } from 'path'
import { v4 as uuid } from 'uuid'

export class CartsMemoryDAO {
    constructor(filename = 'carts.json') {
        this.file = join(process.cwd(), `src/data/${filename}`)
    }

    async getCarts() {

        console.log(this.file)
        const carts = await fs.readFile(this.file, 'utf-8')

        console.log(carts)

        if (!carts || !carts.length) {
            return []
        }

        return JSON.parse(carts)
    }

    async getCartById(id) {

        const carts = await this.getCarts()
        const cart = carts.find(cart => cart._id === id)

        if (!cart) {
            throw new Error('cart not found')
        }

        return cart
    }

    async createCart() {

        const _id = uuid()
        const carts = await this.getCarts()

        const cart = {
            _id,
            products: []
        }

        carts.push(cart)

        await fs.writeFile(this.file, JSON.stringify(carts, null, '\t'))

        return cart
    }

    async addToCart(id, productId) {

        const carts = await this.getCarts()

        const cart = await this.getCartById(id)

        const existingProduct = cart.products.find(prod => prod._id === productId)
        const cartIndex = carts.findIndex(cart => cart._id === id)
        const productIndex = cart.products.findIndex(prod => prod._id === productId)

        if (existingProduct) {
            cart.products[productIndex].quantity += 1
        } else {
            cart.products.push({ _id: productId, quantity: 1 })
        }

        carts[cartIndex] = cart

        await fs.writeFile(this.file, JSON.stringify(carts, null, '\t'))

        return cart
    }

    async removeFromCart(id, productId) {

        const cart = await this.getCartById(id)

        const updatedCart = cart.products.filter(prod => prod._id !== productId)

        const carts = await this.getCarts()

        const updatedCarts = carts.map(cart => {
            if (cart._id === id) {
                cart.products = updatedCart
            }
            return cart
        })

        await fs.writeFile(this.file, JSON.stringify(updatedCarts, null, '\t'))

        return updatedCart
    }

    async clearCart(id) {
        const cleanedCart = {
            id,
            products: []
        }

        const carts = await this.getCarts()

        const updatedCarts = carts.map(cart => {
            if (cart._id === id) {
                cart.products = cleanedCart.products
            }
            return cart
        })

        await fs.writeFile(this.file, JSON.stringify(updatedCarts, null, '\t'))
        return cleanedCart
    }
}