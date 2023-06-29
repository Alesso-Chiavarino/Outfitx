import { getDaos } from "../models/daos/factory.js";
import { GetProductDTO } from "../models/dtos/products.dto.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { validateProduct } from "../utils/validator.js";
import { AddProductDTO, UpdateProductDTO } from "../models/dtos/products.dto.js";

const { productsDao } = getDaos()

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