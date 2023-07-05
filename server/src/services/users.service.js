import { getDaos } from "../models/daos/factory.js";
import { HttpError, HTTP_STATUS } from "../utils/api.utils.js";
import { createHash, isValidPassword } from "../utils/bcrypt.utils.js";
import MailsService from "./mails.service.js";

const { usersDao, cartsDao } = getDaos()

const mailsService = new MailsService()

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
        if (files) {
            const paths = {
                path: files.path,
                originalName: files.originalname
            }
            payload.profilePic = paths
        }
        const newCart = await cartsDao.add()
        payload.cart = newCart._id
        const newUser = await usersDao.addUser(payload)
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

    async updatePassword(email, newPassword) {
        if (!email || !newPassword) {
            throw new HttpError('Email and password are required', HTTP_STATUS.BAD_REQUEST)
        }
        const user = await usersDao.getUserByEmail(email)
        if (!user) {
            throw new HttpError('User not found', HTTP_STATUS.NOT_FOUND)
        }
        if (isValidPassword(user, newPassword)) {
            throw new HttpError('The new password can not be the same that the previous one', HTTP_STATUS.BAD_REQUEST)
        }
        const newHashedPassword = createHash(newPassword)
        console.log(newHashedPassword);
        const newUser = {
            password: newHashedPassword
        }
        const updatedUser = await usersDao.updateUserById(user._id, newUser)
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

    async updateUserRole(uid) {
        if (!uid) {
            throw new HttpError('Must provide an id', HTTP_STATUS.BAD_REQUEST)
        }

        const user = await usersDao.getUserById(uid)

        if (!user) {
            throw new HttpError('User not found', HTTP_STATUS.NOT_FOUND)
        }

        let newRole = {}

        switch (user.role) {
            case 'user':
                newRole.role = 'premium'
                break
            case 'premium':
                newRole.role = 'user'
                break;
            default:
                throw new HttpError('Role not found', HTTP_STATUS.NOT_FOUND)
        }
        const updatedUser = await usersDao.updateUserById(uid, newRole)
        return updatedUser
    }

    async deleteInactiveUsers() {
        const users = await usersDao.getUsers()
        const date = new Date()
        const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
        const inactiveUsers = users.filter(user => {
            if ((date.getTime() - user.last_connection.getTime()) > twoDaysMs) {
                return user
            }
        })
        inactiveUsers.forEach(iUser => {
            mailsService.notifyDeletion(iUser.email, iUser.first_name)
            usersDao.deleteUser(iUser._id)
        })
        return inactiveUsers
    }

}