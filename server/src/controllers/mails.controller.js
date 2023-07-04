import MailsService from "../services/mails.service.js"
import { generateRecoveringToken } from "../utils/session.utils.js"

const mailsService = new MailsService()

class MailController {

    static async recoverPassword(req, res, next) {
        const userEmail = req.body.email
        const token = generateRecoveringToken(userEmail)
        const fullUrl = `${req.protocol}://${req.get('host')}/newpasswordform`
        try {
            const emailSent = await mailsService.recoverPassword(userEmail, token, fullUrl)
            req.logger.info('email sent => ' + JSON.stringify(emailSent))
            return res.redirect('/login')
        } catch (error) {
            next(error)
        }
    }
}

export default MailController