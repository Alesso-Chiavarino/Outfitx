import twilio from 'twilio'
import ENV from '../config/env.config.js'

const { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMBER } = ENV.TWILIO

const twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN)

export const sendSMS = async (to, body) => {
    const info = await twilioClient.messages.create({
        body,
        to,
        from: PHONE_NUMBER
    })

    console.log(info)
}

sendSMS('+543513079987', 'Hello from Twilio!')