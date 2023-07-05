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