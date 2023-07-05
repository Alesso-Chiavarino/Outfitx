import { getDaos } from "../models/daos/factory.js";
import { GetProductDTO } from "../models/dtos/products.dto.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { validateProduct } from "../utils/validator.js";
import { AddProductDTO, UpdateProductDTO } from "../models/dtos/products.dto.js";
import { v4 as uuid } from 'uuid'
import ENV from "../config/env.config.js";
import MailsService from "./mails.service.js";

const { ADMIN_NAME } = ENV

const { productsDao } = getDaos()

const mailsService = new MailsService()

export class ProductsService {

    async getProducts(limit, page, query, sort, protocol, host) {
        let filter
        if (!query) {
            filter = {}
        } else if (query == 'true') {
            filter = { status: true }
        } else if (query == 'false') {
            filter = { status: false }
        } else {
            filter = { category: query }
        }
        const options = {
            sort: (sort ? { price: sort } : {}),
            page: page || 1,
            lean: true
        }
        if (limit) {
            options.limit = limit
        }
        const products = await productsDao.getProducts(filter, options)
        const productsPayloadDTO = []
        products.docs.forEach(product => {
            productsPayloadDTO.push(new GetProductDTO(product))
        });
        products.docs = productsPayloadDTO
        if (!products.hasPrevPage) {
            products.prevLink = null
        } else {
            const actualLimit = limit ? `&limit=${limit}` : ''
            const actualQuery = query ? `&query=${query}` : ''
            const actualSort = sort ? `&sort=${sort}` : ''
            products.prevLink = `${protocol}://${host}/products?page=${page - 1}` + actualLimit + actualQuery + actualSort
        }
        if (!products.hasNextPage) {
            products.nextLink = null
        } else {
            const actualLimit = limit ? `&limit=${limit}` : ''
            const actualQuery = query ? `&query=${query}` : ''
            const actualSort = sort ? `&sort=${sort}` : ''
            products.nextLink = `${protocol}://${host}/products?page=${+(page ?? 1) + 1}` + actualLimit + actualQuery + actualSort
        }
        return products
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

    async createProduct(payload, files, owner) {
        validateProduct(payload)
        payload.code = uuid()
        const productPayloadDTO = new AddProductDTO(payload, files, owner)
        const newProduct = productsDao.createProduct(productPayloadDTO)

        // const newProduct = await productsDao.createProduct(productPayloadDto)

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

    async deleteProductById(id, user) {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const product = await productsDao.getProductById(id)

        if (!product) {
            throw new HttpError('Product not found', HTTP_STATUS.NOT_FOUND)
        }

        if (user.role === 'premium' && user.email !== product.owner) {
            throw new HttpError("Only product owner can delete it", HTTP_STATUS.FORBIDDEN)
        }

        if (product.owner !== ADMIN_NAME) {
            await mailsService.notifyProductDeletion(product.owner, product.title)
        }

        const deletedProduct = await productsDao.deleteProductById(id)

        return deletedProduct

    }
}