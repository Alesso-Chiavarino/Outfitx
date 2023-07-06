import { HTTP_STATUS, successResponse } from "../utils/api.utils";
import { MercadoPagoService } from "../services/mercadopago.service.js";

const mercadoPagoService = new MercadoPagoService()

class MercadoPagoController {

    async checkout(req, res, next) {

        const products = req.body;

        try {
            const checkout = await mercadoPagoService.checkout(products)
            const response = successResponse(checkout)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (err) {
            next(err)
        }
    }

}

export default MercadoPagoController