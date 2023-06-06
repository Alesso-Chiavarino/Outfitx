import { getDaos } from "../models/daos/factory.js";
import { CreateUserDTO } from "../models/dtos/users.dto.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { validateUser } from "../utils/validator.js";

const { usersDao, cartsDao } = getDaos()

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

    createUser = async (payload, files) => {

        if (!Object.keys(payload).length) {
            throw new HttpError('Missing data for user', HTTP_STATUS.BAD_REQUEST)
        }

        validateUser(payload)

        const newCart = await cartsDao.createCart()
        payload.cart = newCart._id

        const userPayloadDto = new CreateUserDTO(payload, files)

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

        const updatedUser = await usersDao.updateUserById(id, payload)

        return updatedUser
    }

    deleteUser = async (id) => {

        if (!id) {
            throw new HttpError('Missing id', HTTP_STATUS.BAD_REQUEST)
        }

        const user = await usersDao.getUserById(id)

        if (!user) {
            throw new HttpError('User not found', HTTP_STATUS.NOT_FOUND)
        }

        const deletedUser = await usersDao.deleteUser(id)
        return deletedUser
    }

}