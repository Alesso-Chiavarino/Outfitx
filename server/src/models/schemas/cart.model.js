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

schema.pre('findById', () => {
    this.populate('product')
})

schema.pre('find', () => {
    this.populate('products.product')
})

schema.pre('findOne', () => {
    this.populate('products.product')
})

const cartModel = model(collection, schema)

export default cartModel