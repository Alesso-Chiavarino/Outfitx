import ENV from '../../config/env.config.js'
import { LogColors } from '../../utils/console.utils.js'
import { MongoManager } from '../db/mongo/mongo.manager.js'

let cartsDao, productsDao, usersDao, ticketsDao
const { DATA_SOURCE } = ENV

LogColors.logBlue(`Using ${DATA_SOURCE} as persistence method`)

switch (DATA_SOURCE) {

    case "FILE": {
        const { CartsMemoryDAO } = await import('./memory/carts.memory.dao.js')
        const { ProductsMemoryDAO } = await import('./memory/products.memory.dao.js')
        cartsDao = new CartsMemoryDAO('carts.json')
        productsDao = new ProductsMemoryDAO('products.json')
        break;
    }

    case "MONGO": {
        MongoManager.connect()
        const { ProductsMongoDAO } = await import('./mongo/products.mongo.dao.js')
        const { CartsMongoDAO } = await import('./mongo/carts.mongo.dao.js')
        const { UsersMongoDAO } = await import('./mongo/users.mongo.dao.js')
        const { TicketsMongoDao } = await import('./mongo/tickets.mongo.dao.js')
        productsDao = new ProductsMongoDAO()
        cartsDao = new CartsMongoDAO()
        usersDao = new UsersMongoDAO()
        ticketsDao = new TicketsMongoDao()
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
        usersDao,
        ticketsDao
    }
}