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

schema.pre('findById', function(){
    this.populate('product')
})

schema.pre('find', function(){
    this.populate('products.product')
})

schema.pre('findOne', function(){
    this.populate('products.product')
})

const cartModel = model(collection, schema)

export default cartModel