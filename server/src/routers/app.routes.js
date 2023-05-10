import { Router } from "express";
import cartsRouter from "./carts/carts.routes.js";
import productsRouter from './products/products.routes.js'

const router = Router();

router.use('carts', cartsRouter)
router.use('products', productsRouter)

export default router