import { HTTP_STATUS } from "../utils/api.utils.js"

export const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next()
        }
        else {
            res.status(HTTP_STATUS.FORBIDDEN).json({
                success: false,
                message: 'You have no access to this resourse'
            })
        }
    }
}