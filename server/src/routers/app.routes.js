import { Router } from "express";
import cartsRouter from "./carts/carts.routes.js";

const router = Router();

router.use('carts', cartsRouter)

export default router