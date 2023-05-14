import ENV from '../../config/env.config.js'
import { LogColors } from '../../utils/console.utils.js'
import { MongoManager } from '../db/mongo/mongo.manager.js'

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
        MongoManager.connect()
        const { ProductsMongoDAO } = await import('./mongo/productsMongo.dao.js')
        const { CartsMongoDAO } = await import('./mongo/cartsMongo.dao.js')
        productsDao = new ProductsMongoDAO()
        cartsDao = new CartsMongoDAO()
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