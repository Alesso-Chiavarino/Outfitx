import { HTTP_STATUS, errorResponse } from "../utils/api.utils.js"

const errorHandler = (err, req, res, next) => {

    const errorMessage = err.description || err.message || 'There was an unknown error'
    const errorDetails = err.description ? null : err
    req.logger.error(errorMessage)
    const response = errorResponse(errorMessage, errorDetails)

    res.status(err.statusNumber || HTTP_STATUS.INTERNAL_SERVER).json(response)
}

export default errorHandler