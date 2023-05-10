import fs from 'fs/promises'
import { join } from 'path'
import { v4 as uuid } from 'uuid'
import { addCartsMemoryDTO } from '../../dtos/memory/cartsMemory.dto.js'

export class CartsMemoryDAO {
    constructor(filename) {
        this.file = join(process.cwd(), `src/data/${filename}`)
    }

    async getCarts() {
        try {
            const carts = await fs.readFile(this.file, 'utf-8')

            if (!carts || !carts.length) {
                return []
            }

            return JSON.parse(carts)
        } catch (err) {
            throw new Error('Error: ', err)
        }
    }

    async getCartById(id) {

        if (!id) {
            throw new Error('id is required')
        }

        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart._id === id)

            if (!cart) {
                throw new Error('cart not found')
            }

            return cart

        } catch (err) {
            throw new Error('Error: ', err)
        }
    }

    async createCart() {

        const id = uuid()

        try {
            const carts = await this.getCarts()

            const cartPayload = new addCartsMemoryDTO(id)

            carts.push(cartPayload)

            await fs.writeFile(this.file, JSON.stringify(carts, null, '\t'))

            return cartPayload

        } catch (err) {
            throw new Error('Error: ', err)
        }
    }

    async addToCart(id, product) {
        try {

            if (!id) {
                throw new Error('id is required')
            }

            if (!product) {
                throw new Error('product is required')
            }

            const carts = await this.getCarts()

            const cart = await this.getCartById(id)

            if (!cart) {
                throw new Error('cart not found')
            }

            const existingProduct = cart.products.find(prod => prod._id === product._id)
            const cartIndex = carts.findIndex(cart => cart._id === id)
            const productIndex = cart.products.findIndex(prod => prod._id === product._id)

            if (existingProduct) {
                existingProduct.quantity += product.quantity

                cart.products[productIndex] = existingProduct

                carts[cartIndex] = cart

            } else {
                const newProduct = {
                    ...product,
                    _id: uuid()
                }

                cart.products.push(newProduct)
            }

            carts[cartIndex] = cart

            await fs.writeFile(this.file, JSON.stringify(carts, null, '\t'))

            return cart


        } catch (err) {
            throw new Error('Error: ', err)
        }
    }
}