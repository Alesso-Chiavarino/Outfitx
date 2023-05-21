import { getDaos } from "../models/daos/factory.js";
import { createUserDTO } from "../models/dtos/users.dto.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { validateUser } from "../utils/validator.js";

const { usersDao, cartDao } = getDaos()

export class UsersService {

    getUsers = async () => {
        const users = await usersDao.getUsers()
        return users
    }

    getUserById = async (id) => {
        if (!id) {
            throw new HttpError("Missing id", HTTP_STATUS.BAD_REQUEST)
        }

        const user = await usersDao.getUserById(id)

        if (!user) {
            throw new HttpError("User not found", HTTP_STATUS.NOT_FOUND)
        }

        return user
    }

    createUser = async (payload, file) => {

        if (!Object.keys(payload).length) {
            throw new HttpError('Missing data for user', HTTP_STATUS.BAD_REQUEST)
        }

        validateUser(payload)

        const newCart = await cartDao.createCart()
        payload.cart = newCart._id

        const userPayloadDto = new createUserDTO(payload, file)

        const newUser = await usersDao.createUser(userPayloadDto)
        return newUser
    }

    updateUserById = async (id, payload) => {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        if (!Object.keys(payload).length) {
            throw new HttpError('Missing data for user', HTTP_STATUS.BAD_REQUEST)
        }

        validateUser(payload)

        const updatedUser = await usersDao.updateUserById(id, payload)

        return updatedUser
    }

    deleteUser = async (id) => {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const deletedUser = await usersDao.deleteUser(id)
        return deletedUser
    }

}