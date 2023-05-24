import ENV from "./env.config.js";

export const DB_CONFIG = {
    mongo: {
        local: {
            dev: {
                uri: ENV.MONGO_LOCAL_URI,
            },
            test: {
                uri: ENV.MONGO_LOCAL_TEST_URI,
            }
        },
        atlas: {
            uri: ENV.MONGO_ATLAS_URI
        }
    }
}