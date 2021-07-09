const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "Nenhum"
    },
    imageUrl:{
        type: String,
        default: "https://image.flaticon.com/icons/png/512/1998/1998728.png"
    }
})

// https://image.flaticon.com/icons/png/512/2939/2939326.png
// https://image.flaticon.com/icons/png/512/774/774834.png

module.exports = mongoose.model('User', user)