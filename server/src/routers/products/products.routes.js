import { Router } from 'express'
import ProductsController from '../../controllers/products.controller.js'
import { uploader } from '../../utils/multer.utils.js'

const router = Router()

router.get('/', ProductsController.getProducts)
router.get('/:id', ProductsController.getProduct)
router.post('/', uploader.array('thumbnails'), ProductsController.createProduct)
router.put('/:id', ProductsController.updateProduct)
router.delete('/:id', ProductsController.deleteProduct)



export default router