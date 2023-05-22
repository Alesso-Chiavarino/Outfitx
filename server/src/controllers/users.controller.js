import { UsersService } from "../services/users.service.js";
import { HTTP_STATUS, successResponse } from '../utils/api.utils.js';

const userService = new UsersService()

export class usersController {
    static getUsers = async (req, res, next) => {
        try {
            const users = await userService.getUsers()
            const response = successResponse(users)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static getUser = async (req, res, next) => {
        const { id } = req.params

        try {
            const user = await userService.getUserById(id)
            const response = successResponse(user)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static createUser = async (req, res, next) => {
        const payload = req.body
        const { files } = req
        console.log(files)

        try {
            const newUser = await userService.createUser(payload, files)
            const response = successResponse(newUser)
            req.logger.info('User created successfully')
            res.status(HTTP_STATUS.CREATED).json(response)
        } catch (err) {
            next(err)
        }
    }

    static updateUser = async (req, res, next) => {
        const { id } = req.params
        const payload = req.body

        try {
            const updatedUser = await userService.updateUserById(id, payload)
            const response = successResponse(updatedUser)
            req.logger.info('User updated successfully')
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static deleteUser = async (req, res, next) => {
        const { id } = req.params

        try {
            const deletedUser = await userService.deleteUser(id)
            const response = successResponse(deletedUser)
            req.logger.info('User deleted successfully')
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }
}