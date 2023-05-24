import mongoose from 'mongoose'
import { DB_CONFIG } from '../../../config/db.config.js';
import { logError, LogColors } from '../../../utils/console.utils.js';

export class MongoManager {
    static #instance = false;

    constructor() {
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_CONFIG.mongo.local.test.uri)
            .then(res => {
                LogColors.logMagenta('MongoDB connection established')
            })
            .catch(err => {
                logError('MongoDB connection failed')
                throw err
            })
    }

    static connect() {
        if (!this.#instance) {
            this.#instance = new MongoManager()
        }
        return this.#instance
    }
}