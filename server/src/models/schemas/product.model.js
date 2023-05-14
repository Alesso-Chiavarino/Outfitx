import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const collection = 'products'
const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    code : {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    thumbnail: {
        type: [],
        default: []
    }
})

schema.plugin(mongoosePaginate)
const productModel = model(collection, schema)

export default productModel