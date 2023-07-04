import { Router } from "express";
import { UsersController } from "../../controllers/users.controller.js";
import { uploader } from "../../utils/multer.utils.js";
import { passportCall } from "../../middlewares/passport.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = Router()

router.get('/', passportCall('jwt'), roleMiddleware(['admin']), UsersController.getUsers)
router.get('/:id', UsersController.getUserById)
router.post('/', uploader.single('file'), UsersController.createUser)
router.put('/generatenewpassword', UsersController.updatePassword)
router.put('/premium/:uid', UsersController.changeRole)
router.put('/:id', UsersController.updateUser)
router.delete('/', passportCall('jwt'), roleMiddleware(['admin']), UsersController.deleteInactiveUsers)
router.delete('/:id', UsersController.deleteUser)

export default router