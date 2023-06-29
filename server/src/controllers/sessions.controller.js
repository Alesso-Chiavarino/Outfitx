import { UsersService } from "../services/users.service.js"
import { successResponse, HTTP_STATUS, HttpError } from "../utils/api.utils.js"
import { generateToken } from "../utils/session.utils.js"
import ENV from "../config/env.config.js"
const { SESSION_KEY } = ENV

const usersService = new UsersService()

export class SessionsController {

    static async login(req, res, next) {
        const { user } = req;
        try {
            if (!user) {
                req.logger.error('User not found')
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'User not found')
            }
            if (user.role !== 'admin') {
                await usersService.updateUserById(user._id, { last_connection: new Date() })
            }
            const access_token = generateToken(user);
            res.cookie(SESSION_KEY, access_token, {
                maxAge: 60 * 60 * 24 * 1000,
                httpOnly: true
            });
            req.logger.info(`${user.email} logged in`)
            res.redirect('/products');
        } catch (error) {
            next(error)
        }
    }

    static async loginGithub(req, res, next) {
        const { user } = req;
        await usersService.updateUserById(user._id, { last_connection: new Date() })
        const access_token = generateToken(user);
        res.cookie(SESSION_KEY, access_token, {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true
        });
        req.logger.info(`${user.email} logged in with Github`)
        res.redirect('/products');
    }

    static async logout(req, res, next) {
        try {
            const { user } = req;
            if (user.role !== 'admin') {
                await usersService.updateUserById(user.id, { last_connection: new Date() })
            }
            res.clearCookie(SESSION_KEY);
            req.logger.info('user logged out')
            res.redirect('/');
        } catch (error) {
            next(error)
        }
    }

    static async currentSession(req, res, next) {
        const response = successResponse(req.user);
        return res.json(response);
    }
}