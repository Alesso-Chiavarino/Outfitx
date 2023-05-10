import { Router } from 'express'
import ProductsController from '../../controllers/products.controller.js'

const router = Router()

router.get('/', ProductsController.getProducts)
router.get('/:id', ProductsController.getProduct)
router.post('/', ProductsController.createProduct)
router.put('/:id', ProductsController.updateProduct)
router.delete('/:id', ProductsController.deleteProduct)



export default router