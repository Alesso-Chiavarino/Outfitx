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
}

export const validateUser = (payload) => {
    const { user_name, last_name, email, password, role, cart } = payload

    if (!user_name) {
        throw new HttpError('username is required', HTTP_STATUS.BAD_REQUEST);
    }

    if (!last_name) {
        throw new HttpError('lastname is required', HTTP_STATUS.BAD_REQUEST);
    }

    if (!email) {
        throw new HttpError('email is required', HTTP_STATUS.BAD_REQUEST);
    }

    if (!password) {
        throw new HttpError('password is required', HTTP_STATUS.BAD_REQUEST);
    }

    if (!role) {
        throw new HttpError('role is required', HTTP_STATUS.BAD_REQUEST);
    }

    if (!cart) {
        throw new HttpError('cart is required', HTTP_STATUS.BAD_REQUEST);
    }

}
