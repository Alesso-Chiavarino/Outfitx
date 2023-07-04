import nodemailer from 'nodemailer'
import ENV from '../config/env.config.js'

const { APLICATION_PASSWORD, EMAIL } = ENV.GOOGLE

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: APLICATION_PASSWORD,
    },
})

const html = `
    <h1>Outfitx</h1>
    <h3>Hello, {CLIENT NAME}</h3>
    <p>Order confirmation</p>
    <p>Thank you for your purchase</p>
    <h3>Details</h3>
    <p>Oder num: {NUM OF ORDER}</p>
`

export const sendMail = async (to, subject, html) => {

    const info = await transporter.sendMail({
        from: EMAIL,
        to,
        subject,
        html,
        attachments: []
    })

    console.log(info)

}

// sendMail('alessochiavarino@gmail.com', 'test', html)