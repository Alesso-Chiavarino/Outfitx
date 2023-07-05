import { Router } from "express";
import { CartsController } from "../../controllers/carts.controller.js";
import { passportCall } from "../../middlewares/passport.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = Router();

router.get('/', CartsController.getCarts)
router.get('/:id', CartsController.getCart)
router.post('/', CartsController.createCart)
router.post('/:id/product/:pid', passportCall('jwt'), roleMiddleware(['user', 'premium']), CartsController.addToCart)
router.put('/:cid', passportCall('jwt'), roleMiddleware(['admin']), CartsController.updateCart)
router.put('/:cid/purchase', passportCall('jwt'), roleMiddleware(['user', 'premium']), CartsController.purchase)
router.delete('/:cid/product/:pid', passportCall('jwt'), roleMiddleware(['user', 'premium']), CartsController.removeFromCart)
router.delete('/:id', CartsController.clearCart)
router.delete('/remove/:id', CartsController.deleteCart)

export default router