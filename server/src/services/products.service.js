import { getDaos } from "../models/daos/factory.js";
import { GetProductDTO } from "../models/dtos/mongo/productsMongo.dto.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { validateProduct } from "../utils/validator.js";
import { AddProductDTO, UpdateProductDTO } from "../models/dtos/memory/productsMemory.dto.js";

const { productsDao } = getDaos()

export class ProductsService {

    async getProducts(filter = {}) {
        const products = await productsDao.getProducts()
        const productsPayloadDto = []

        products.map(prod => {
            productsPayloadDto.push(new GetProductDTO(prod))
        })

        return productsPayloadDto
    }

    async getProductById(id) {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const product = await productsDao.getProductById(id)

        if (!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        const productPayloadDto = new GetProductDTO(product)

        return productPayloadDto
    }

    async createProduct(payload, files) {

        validateProduct(payload)

        const productPayloadDto = new AddProductDTO(payload, files)

        const newProduct = await productsDao.createProduct(productPayloadDto)

        return newProduct

    }

    async updateProductById(id, payload) {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const product = await productsDao.getProductById(id)

        if(!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        validateProduct(payload)

        const productPayloadDto = new UpdateProductDTO(product)

        const updatedProduct = await productsDao.updateProductById(id ,productPayloadDto)

        return updatedProduct

    }

    async deleteProductById(id) {

        if(!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const product = await productsDao.getProductById(id)

        if(!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        const deletedProduct = await productsDao.deleteProductById(id)

        return deletedProduct

    }
}