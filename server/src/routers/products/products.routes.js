import { Router } from 'express'
import ProductsController from '../../controllers/products.controller.js'
import { uploader } from '../../utils/multer.utils.js'
import { passportCall } from '../../middlewares/passport.middleware.js'
import { roleMiddleware } from '../../middlewares/role.middleware.js'

const router = Router()

router.get('/', ProductsController.getProducts)
router.get('/:id', ProductsController.getProduct)
router.post('/', passportCall('jwt'), roleMiddleware(['admin', 'premium']), uploader.array('thumbnails'), ProductsController.createProduct)
router.put('/:id', passportCall('jwt'), roleMiddleware(['admin', 'premium']), ProductsController.updateProduct)
router.delete('/:id', passportCall('jwt'), roleMiddleware(['admin', 'premium']), ProductsController.deleteProduct)



export default router