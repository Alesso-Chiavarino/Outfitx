import { config } from 'dotenv'

config()

const ENV = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI || '',
    MONGO_LOCAL_TEST_URI: process.env.MONGO_LOCAL_URI_TEST || '',
    MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI || '',
    DATA_SOURCE: process.env.DATA_SOURCE || 'FILE',
    SECRET_KEY: process.env.SECRET_KEY || '',
    SESSION_KEY: process.env.SESSION_KEY || '',
    ADMIN_NAME: process.env.ADMIN_NAME || '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
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