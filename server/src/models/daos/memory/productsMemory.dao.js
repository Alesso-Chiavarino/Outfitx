import fs from 'fs/promises'
import { join } from 'path'
import { AddProductDTO } from '../../dtos/memory/productsMemory.dto.js'
import { v4 as uuid } from 'uuid'
import { validateProduct } from '../../../utils/validator.js'

export class ProductsMemoryDAO {

    constructor(filename) {
        this.path = join(process.cwd(), `src/data/${filename}`)
    }

    async getProducts() {

        try {
            if (!fs.existsSync(this.path)) {

                const products = await fs.readFile('./src/data/products.json', 'utf-8')

                if (!products || !products.length) {
                    return []
                }

                return JSON.parse(products)
            }
        } catch (err) {
            throw new Error(err.message)
        }

    }

    async getProductById(id) {
        try {

            if (!id) {
                throw new Error('id is required')
            }

            const products = await this.getProducts()

            const filteredProduct = products.find(prod => prod._id === id)

            if (!filteredProduct) {
                throw new Error('product not found')
            }

            return filteredProduct

        } catch (err) {
            throw new Error(err.message)
        }
    }

    async createProduct(payload) {

        const _id = uuid()

        Object.assign(payload, _id)

        try {

            const products = await this.getProducts()
            const duplicatedProduct = products.find(prod => prod.code === code)

            if (duplicatedProduct) {
                throw new Error('product already exists')
            }

            products.push(payload)

            fs.writeFile(this.path, JSON.stringify(products, null, '\t'))

            return productPayloadDto


        } catch (err) {
            throw new Error(err.message)
        }


    }

    async updateProductById(id, payload) {

        try {
            const products = await this.getProducts()
            const filteredProduct = await this.getProductById(id)

            if (!filteredProduct) {
                throw new Error('product not found')
            }

            const updatedProducts = products.map(prod => {
                if (prod._id === id) {
                    return payload
                }
                return prod
            })

            fs.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'))

            return payload
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async deleteProductById(id) {
        try {
            const products = await this.getProducts()
            const filteredProduct = await this.getProductById(id)

            if (!filteredProduct) {
                throw new Error('product not found')
            }

            const updatedProducts = products.filter(prod => prod._id !== id)

            fs.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'))

            return filteredProduct
        } catch (err) {
            throw new Error(err.message)
        }
    }
}