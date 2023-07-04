import { UsersService } from "../services/users.service.js";
import { HTTP_STATUS, successResponse } from '../utils/api.utils.js';
import ENV from "../config/env.config.js";
import { CreateUserDTO } from "../models/dtos/users.dto.js";
import jwt from 'jsonwebtoken'
import { HttpError } from "../utils/api.utils.js";


const { SECRET_KEY } = ENV

const usersService = new UsersService()

export class UsersController {
    static getUsers = async (req, res, next) => {
        try {
            const users = await usersService.getUsers()
            const response = successResponse(users)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static getUserById = async (req, res, next) => {
        const { id } = req.params

        try {
            const user = await usersService.getUserById(id)
            const response = successResponse(user)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static createUser = async (req, res, next) => {
        const payload = req.body
        const { file } = req
        try {
            const userPayload = new CreateUserDTO(payload)
            const newUser = await usersService.createUser(userPayload, file)
            req.logger.info('New user created')
            const response = successResponse(newUser)
            return res.status(HTTP_STATUS.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    static updateUser = async (req, res, next) => {
        const { id } = req.params
        const payload = req.body

        try {
            const updatedUser = await usersService.updateUserById(id, payload)
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
            const deletedUser = await usersService.deleteUser(id)
            const response = successResponse(deletedUser)
            req.logger.info('User deleted successfully')
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

    static async updatePassword(req, res, next) {
        const { password, token } = req.body
        try {
            let email
            jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
                if (error) {
                    req.logger.info('Invalid Token:', error.message);
                    throw new HttpError('Expired token', HTTP_STATUS.FORBIDDEN)
                } else {
                    email = decodedToken.email
                }
            });
            const updatedUser = await usersService.updatePassword(email, password, token)
            req.logger.info('Password updated')
            const response = successResponse(updatedUser)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async changeRole(req, res, next) {
        const { uid } = req.params
        try {
            const updatedUser = await usersService.updateUserRole(uid)
            req.logger.info('User role updated')
            const response = successResponse(updatedUser)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)

        }
    }

    static async deleteInactiveUsers(req, res, next) {
        try {
            const deletedUsers = await usersService.deleteInactive()
            req.logger.info('Inactive users deleted')
            const response = successResponse(deletedUsers)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
}