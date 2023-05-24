import { getDaos } from "../models/daos/factory.js";
import { GetProductDTO } from "../models/dtos/products.dto.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { validateProduct } from "../utils/validator.js";
import { AddProductDTO, UpdateProductDTO } from "../models/dtos/products.dto.js";

const { productsDao } = getDaos()

export class ProductsService {

    async getProducts(filter = {}) {
        const products = await productsDao.getProducts(filter)
        const productsPayloadDto = []

        if (!products.docs.length) {
            throw new HttpError('No products found', HTTP_STATUS.NOT_FOUND)
        }

        products.docs.forEach(product => {
            productsPayloadDto.push(new GetProductDTO(product))
        });

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

        if (!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        // validateProduct(payload)

        const productPayloadDto = new UpdateProductDTO(payload)

        const updatedProduct = await productsDao.updateProductById(id, productPayloadDto)

        return updatedProduct

    }

    async deleteProductById(id) {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const product = await productsDao.getProductById(id)

        if (!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        const deletedProduct = await productsDao.deleteProductById(id)

        return deletedProduct

    }
}