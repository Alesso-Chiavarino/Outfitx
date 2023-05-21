import { devLogger, prodLogger } from "../utils/logger.js"
import { args } from "../config/args.config.js"

export const addLogger = (req, res, next) => {
    switch (args.mode) {
        case 'development': {
            req.logger = devLogger
            break
        }
        case 'production': {
            req.logger = prodLogger
            break
        }
    }
    next()
}