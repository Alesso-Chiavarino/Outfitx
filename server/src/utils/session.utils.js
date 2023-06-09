import jwt from 'jsonwebtoken'
import ENV from '../config/env.config.js'

const { SECRET_KEY, SESSION_KEY } = ENV

export const generateToken = (user) => {
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '24h' })
    return token
}

export const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[SESSION_KEY]
    }
    return token
}

export const generateRecoveringToken = (email) => {
    const recoverToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    return recoverToken
};
