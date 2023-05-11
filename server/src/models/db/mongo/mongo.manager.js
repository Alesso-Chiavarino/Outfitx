import mongoose from 'mongoose'
import { DB_CONFIG } from '../../../config/db.config.js';
import { logError, logSuccess } from '../../../utils/console.utils.js';

export class MongoManager {
    static #instance = false;

    constructor() {
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_CONFIG.mongo.local.uri, err => {
            if (err) {
                logError(`Db connenction failed ${err}`)
                throw err
            }
            logSuccess(`Db connenction success`)
        })
    }

    static connect() {
        if (!this.#instance) {
            this.#instance = new MongoManager()
        }
        return this.#instance
    }
}