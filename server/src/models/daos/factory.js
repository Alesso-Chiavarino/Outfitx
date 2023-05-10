import { DATA_SOURCE } from '../../config/env.config.js'
import { LogColors } from '../../utils/console.utils.js'

let cartsDao, productsDao

LogColors.logBlue(`Using ${DATA_SOURCE} as persistence method`)

switch (DATA_SOURCE) {

    case "FILE": {
        const CartMemoryDao = await import('./memory/cartsMemory.dao.js')
        const ProductMemoryDao = await import('./memory/productsMemory.dao.js')
        cartsDao = new CartMemoryDao()
        productsDao = new ProductMemoryDao()
        break;
    }

    case "MONGO": {
        // MongoManager.connect()
        // const CartMongoDao = require('./mongo/CartMongoDao')
        // const { ProductMongoDao } = require('./mongo/ProductMongoDao')
        // const ChatMongoDao = require('./mongo/ChatMongoDao')
        // const UserMongoDao = require('./mongo/UserMongoDao')
        // const { TicketMongoDao } = require("./mongo/TicketMongoDao.js");
        // cartsDao = new CartMongoDao()
        // productsDao = new ProductMongoDao()
        // chatsDao = new ChatMongoDao()
        // usersDao = new UserMongoDao()
        // ticketsDao = new TicketMongoDao()
        break;
    }

    default: {
        throw new Error('You must provide a valid persistence method')
    }
}

export const getDaos = () => {
    return {
        cartsDao,
        productsDao,
    }
}