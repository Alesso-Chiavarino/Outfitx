import { Router } from "express";
import cartsRouter from "./carts/carts.routes.js";
import productsRouter from './products/products.routes.js'
import errorHandler from "../middlewares/error.middleware.js";

const router = Router();

router.get('/', (req, res) => {
    res.send('welcome to Outfitx RESTAPI')
})

router.use('/carts', cartsRouter)
router.use('/products', productsRouter)
router.use(errorHandler)

export default router