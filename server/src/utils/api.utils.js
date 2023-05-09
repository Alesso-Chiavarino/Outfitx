export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
}

export const successResponse = (payload) => {
    return {
        success: true,
        data: payload
    }
}

export const errorResponse = (description, error = null) => {
    return {
        success: false,
        description,
        details: error
    }
}

export class HttpError {
    constructor(description, status = 500, details = null) {
        this.description = description
        this.statusNumber = status
        this.details = details
    }
}