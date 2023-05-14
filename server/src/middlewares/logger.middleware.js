import { devLogger } from "../utils/logger.js"

export const addLogger = (req, res, next) => {
    req.logger = devLogger
    // logger.http(`[${req.method}] => ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

// export const addLogger = (req, res, next) => {
//     const addLogger = (req, res, next) => {
//         if (args.mode === 'production') {
//             req.logger = prodLogger
//         } else {
//             req.logger = devLogger
//         }
//         next()
//     }
// }