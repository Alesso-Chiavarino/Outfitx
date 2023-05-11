import { model, Schema } from 'mongoose'

const collection = 'carts'
const schema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    default: 1,
                    required: true
                }
            }
        ],
        default: [],
        required: true
    }
})

cartSchema.pre('findById', () => {
    this.populate('product')
})

cartSchema.pre('find', () => {
    this.populate('products.product')
})

cartSchema.pre('findOne', () => {
    this.populate('products.product')
})

const cartModel = new model(collection, schema)

export default cartModel