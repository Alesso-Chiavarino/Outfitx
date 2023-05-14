import { Router } from "express";
import { generateProduct } from "../../mocks/products.mock.js";
import { successResponse, HTTP_STATUS } from "../../utils/api.utils.js";

const router = Router()

router.get('/', (req, res) => {
    const product = Array.from({ length: 100 }, () => generateProduct())
    const response = successResponse(product)
    res.status(HTTP_STATUS.OK).json(response)
})

export default router