import { config } from 'dotenv'

config()

const ENV = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || '',
    DATA_SOURCE: process.env.DATA_SOURCE || 'FILE',
    GOOGLE: {
        APLICATION_PASSWORD: process.env.GOOGLE_APLICATION_PASSWORD || '',
        EMAIL: process.env.GOOGLE_EMAIL || '',
    },
    TWILIO: {
        AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
        ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
        PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
    }
}

export default ENV