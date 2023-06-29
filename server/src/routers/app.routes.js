import { Router } from "express";
import cartsRouter from "./carts/carts.routes.js";
import productsRouter from './products/products.routes.js'
import errorHandler from "../middlewares/error.middleware.js";
import productsMock from "./mocks/mocks.routes.js";
import loggerRouter from "./logger/logger.routes.js";
import usersRouter from './users/users.routes.js'
import sessionRouter from './session/session.routes.js'

const router = Router();

router.get('/', (req, res) => {
    res.send('welcome to Outfitx RESTAPI')
})

router.use('/carts', cartsRouter)
router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/mockingproducts', productsMock)
router.use('/loggerTest', loggerRouter)
router.use('/session', sessionRouter)
router.use(errorHandler)

export default router