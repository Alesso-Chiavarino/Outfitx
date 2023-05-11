import { HTTP_STATUS, HttpError } from "./api.utils.js"

export const validateProduct = (payload) => {
    const { title, description, code, stock, price, category } = payload;

    if (!title) {
        throw new HttpError('title is required', HTTP_STATUS.BAD_REQUEST);
    }
    if (!description) {
        throw new HttpError('description is required', HTTP_STATUS.BAD_REQUEST);
    }
    if (!code) {
        throw new HttpError('code is required', HTTP_STATUS.BAD_REQUEST);
    }
    if (!stock) {
        throw new HttpError('stock is required', HTTP_STATUS.BAD_REQUEST);
    }
    if (stock <= 0) {
        throw new HttpError('stock must be greater than 0', HTTP_STATUS.BAD_REQUEST);
    }
    if (!price) {
        throw new HttpError('price is required', HTTP_STATUS.BAD_REQUEST);
    }
    if (!category) {
        throw new HttpError('category is required', HTTP_STATUS.BAD_REQUEST);
    }
};
