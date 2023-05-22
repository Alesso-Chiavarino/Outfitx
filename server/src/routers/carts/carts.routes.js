import { Router } from "express";
import { CartsController } from "../../controllers/carts.controller.js";

const router = Router();

router.get('/', CartsController.getCarts)
router.get('/:id', CartsController.getCart)
router.post('/', CartsController.createCart)
router.put('/:id/product/:pid', CartsController.addToCart)
router.delete('/:id/product/:pid', CartsController.removeFromCart)
router.delete('/:id', CartsController.clearCart)
router.delete('/remove/:id', CartsController.deleteCart)

export default router