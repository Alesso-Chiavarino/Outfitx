import ENV from "./env.config.js";

export const DB_CONFIG = {
    mongo: {
        local: {
            uri: ENV.MONGO_LOCAL_URI,
        },
        atlas: {
            // uri: ENV.MONGO_ATLAS_URI,
        }
    }
}