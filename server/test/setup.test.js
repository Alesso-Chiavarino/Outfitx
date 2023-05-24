import mongoose from "mongoose";
import productModel from "../src/models/schemas/product.model.js";
import cartModel from "../src/models/schemas/cart.model.js";
import { DB_CONFIG } from "../src/config/db.config.js";

export const dropProducts = async () => {
    await productModel.collection.drop()
}

export const dropCarts = async () => {
    await cartModel.collection.drop()
}

before(async () => {
    try {
        await mongoose.connect(DB_CONFIG.mongo.local.test.uri)
    }
    catch (err) {
        throw new Error(err)
    }
    // finally {
    //     if (productModel.collection) {
    //         await dropProducts()
    //     }
    //     if (cartModel.collection) {
    //         await dropCarts()
    //     }
    // }

})

after(async () => {

    try {
        if (productModel.collection) {
            await dropProducts()
        }
        if (cartModel.collection) {
            await dropCarts()
        }
    }
    catch (err) {
        throw new Error(err)
    }
    finally {
        await mongoose.connection.close()
    }
})

