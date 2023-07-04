import { Router } from "express";

const router = Router()

import MailController from "../../controllers/mails.controller.js";

router.post('/', MailController.recoverPassword)

export default router