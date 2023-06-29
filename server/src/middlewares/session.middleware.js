import ENV from "../config/env.config.js";

const { SESSION_KEY } = ENV

export const sessionMiddleware = async (req, res, next) => {
    const cookies = req.cookies
    if (Object.keys(cookies).includes(SESSION_KEY)) {
        res.redirect('/products');
    } else {
        next();
    }
}