import fs from 'fs/promises'
import { join } from 'path'
import { v4 as uuid } from 'uuid'

export class ProductsMemoryDAO {

    constructor(filename) {
        this.path = join(process.cwd(), `src/data/${filename}`)
    }

    async getProducts() {
        const products = await fs.readFile('./src/data/products.json', 'utf-8')

        if (!products || !products.length) {
            return []
        }

        return JSON.parse(products)

    }

    async getProductById(id) {
        const products = await this.getProducts()

        const filteredProduct = products.find(prod => prod._id === id)

        return filteredProduct
    }

    async createProduct(payload) {

        const _id = { _id: uuid() }

        Object.assign(payload, _id)

        const products = await this.getProducts()
        const duplicatedProduct = products.find(prod => prod.code === payload.code)

        if (duplicatedProduct) {
            throw new Error('product already exists')
        }

        products.push(payload)

        fs.writeFile(this.path, JSON.stringify(products, null, '\t'))

        console.log(payload)

        return payload

    }

    async updateProductById(id, payload) {

        const products = await this.getProducts()
        const filteredProduct = await this.getProductById(id)

        const updatedProduct = {
            ...filteredProduct,
            ...payload
        }

        const updatedProducts = products.map(prod => {
            if (prod._id === id) {
                return updatedProduct
            }
            return prod
        })

        fs.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'))

        return updatedProduct
    }

    async deleteProductById(id) {
        const products = await this.getProducts()
        const filteredProduct = await this.getProductById(id)

        if (!filteredProduct) {
            throw new Error('product not found')
        }

        const updatedProducts = products.filter(prod => prod._id !== id)

        fs.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'))

        return filteredProduct
    }
}