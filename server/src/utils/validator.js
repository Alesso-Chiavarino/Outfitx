import { HTTP_STATUS, HttpError } from "./api.utils.js"

export const validateProduct = (payload) => {

    const { title, description, code, stock, price, category } = payload

    switch (true) {
        case !title: throw new HttpError('title is required', HTTP_STATUS.BAD_REQUEST)
        case !description: throw new HttpError('description is required', HTTP_STATUS.BAD_REQUEST)
        case !code: throw new HttpError('code is required', HTTP_STATUS.BAD_REQUEST)
        case !stock: throw new HttpError('stock is required', HTTP_STATUS.BAD_REQUEST)
        case !price: throw new HttpError('price is required', HTTP_STATUS.BAD_REQUEST)
        case !category: throw new HttpError('category is required', HTTP_STATUS.BAD_REQUEST)
    }
}