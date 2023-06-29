import ENV from "../config/env.config.js"

const { SESSION_KEY } = ENV

export const authMiddleware = async (req, res, next) => {
    const cookies = req.cookies
    if (Object.keys(cookies).includes(SESSION_KEY)) {
        next();
    } else {
        res.redirect('/');
    }
};