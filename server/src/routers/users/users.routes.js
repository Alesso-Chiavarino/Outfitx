import { Router } from "express";
import { usersController } from "../../controllers/users.controller.js";
import { uploader } from "../../utils/multer.utils.js";

const router = Router()

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUser)
router.post('/', uploader.array('profile_pic'), usersController.createUser)
router.put('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

export default router