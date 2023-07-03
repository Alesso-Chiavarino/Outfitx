import cartModel from '../../schemas/cart.model.js'

export class CartsMongoDAO {
    async getCarts() {
        const carts = await cartModel.find()
        return carts
    }

    async getCartById(id) {
        const cart = await cartModel.findById(id).lean()
        return cart
    }

    async createCart() {
        const cart = await cartModel.create({})
        return cart
    }

    async addToCart(id, pid, amount) {
        const updatedCart = await cartModel.findByIdAndUpdate(id, {
            $push: {
                products: {
                    product: pid,
                    quantity: amount
                }
            }
        }, { new: true })
        return updatedCart
    }

    async removeFromCart(cid, pid) {
        const cart = cartModel.updateOne({ _id: cid }, { $pull: { products: { product: { _id: pid } } } })
        return cart
    }

    async updateCart(cid, products){
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products })
        return updatedCart
    }

    async clearCart(id) {
        const emptyCart = cartModel.updateOne({ _id: id }, {
            $pull: {
                products: {}
            }
        }, { new: true })

        return emptyCart
    }

    async deleteCart(id) {
        const deletedCart = await cartModel.findByIdAndDelete(id)
        return deletedCart
    }
}