import { sendMail } from '../messaging/nodemailer.messaging.js'

class MailsService {

    async recoverPassword(userEmail, token, fullUrl) {
        if (!token) {
            throw new HttpError('Missing token', HTTP_STATUS.BAD_REQUEST)
        }
        if (!fullUrl) {
            throw new HttpError('Missing url', HTTP_STATUS.BAD_REQUEST)
        }

        const html = `
            <div>
                <h1>Password reset</h1>
                <p>Enter the following link to set a new password:</p>
                <a href="${fullUrl}?token=${token}">Click here to reset your password</a>
                <p>If you didn't request a password reset, you can ignore this email.</p>
                <strong>Outfitx Team</strong>
            </div>
        `

        return sendMail(userEmail, 'Password reset', html)
    }

    async notifyDeletion(userEmail, userName) {

        const html = `
            <div>
                <h1>Account Deactivation Notice</h1>
                <p>I ${userName}, your account (${userEmail}) deactivation has been requested.</p>
                <p>If you did not request this, please contact our support team immediately.</p>
                <p>If you wish to proceed with deactivating your account, please note the following:</p>
                <ul>
                    <li>You will lose access to all services and data associated with your account.</li>
                    <li>You will not be able to recover your account once it is deactivated.</li>
                </ul>
                <strong>Outfitx Team</strong>
            </div>   
        `

        return sendMail(userEmail, 'Account Deactivation Notice', html)
    }

    async notifyProductDeletion(userEmail, product) {

        const html = `
            <div>
                <h1>Product Deletion Notice</h1>
                <p>Dear ${userEmail},</p>
                <p>We regret to inform you that the following product, which belonged to you, has been deleted:</p>
                <p><strong>Product Name:</strong> ${product}</p>
                <p>If you have any questions or need further information, please do not hesitate to contact us.</p>
                <p>Best regards,</p>
                <strong>Outfitx Team</strong>
            </div>
        `

        return sendMail(userEmail, 'Product Deletion Notice', html)
    }

    async sendOrderConfirmation(user, order) {

        const { purchaser, code, purchase_datetime, amount } = order.newTicket

        const { products } = order.cart

        const domain = 'https://outfitx.onrender.com'

        const html = `
            <div>
                <h1>Order Confirmation</h1>
                <p>Dear ${user.firstName},</p>
                <p>We are pleased to inform you that your order has been confirmed:</p>
                <p><strong>Order ID:</strong> ${code}</p>
                <p><strong>Order Date:</strong> ${purchase_datetime}</p>
                <p><strong>Order Total:</strong> ${amount}</p>
                <p><strong>Order Products:</strong></p>
                <table style="border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                    <tr>
                        <td style="border: 1px solid black; padding: 5px;">
                            <img src="${domain}/statics/products/${encodeURIComponent(product.product.thumbnails[0].originalName)}" alt="${product.product.title}" width="100" height="100">
                        </td>
                        <td style="border: 1px solid black; padding: 5px;">${product.product.title}</td>
                        <td style="border: 1px solid black; padding: 5px;">${product.product.price}</td>
                        <td style="border: 1px solid black; padding: 5px;">${product.quantity}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
                <p>If you have any questions or need further information, please do not hesitate to contact us.</p>
                <p>Best regards,</p>
                <strong>Outfitx Team</strong>
            </div>
        `

        return sendMail(purchaser, 'Order Confirmation', html)

    }

}

export default MailsService