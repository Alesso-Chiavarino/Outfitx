import cartModel from '../../schemas/cart.model.js'

export class CartsMongoDAO {
    async getCarts() {
        const carts = await cartModel.find()
        return carts
    }

    async getCartById(id) {
        const cart = await cartModel.findById(id)
        return cart
    }

    async createCart() {
        const cart = await cartModel.create({})
        return cart
    }

    async addToCart(id, pid, amount) {
        const updatedCart = await cartModel.updateOne({ _id: id }, {
            $push: {
                products: {
                    _id: pid,
                    quantity: amount
                }
            },
        }, { new: true })

        return updatedCart
    }

    async removeFromCart(id, pid) {
        const updatedCart = cartModel.updateOne({ _id: id }, {
            $pull: {
                products: {
                    _id: pid
                }
            }
        }, { new: true })

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