const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', product)