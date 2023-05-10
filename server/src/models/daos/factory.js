import ENV from '../../config/env.config.js'
import { LogColors } from '../../utils/console.utils.js'

let cartsDao, productsDao
const { DATA_SOURCE } = ENV

LogColors.logBlue(`Using ${DATA_SOURCE} as persistence method`)

switch (DATA_SOURCE) {

    case "FILE": {
        const { CartsMemoryDAO } = await import('./memory/cartsMemory.dao.js')
        const { ProductsMemoryDAO } = await import('./memory/productsMemory.dao.js')
        cartsDao = new CartsMemoryDAO('carts.json')
        productsDao = new ProductsMemoryDAO('products.json')
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