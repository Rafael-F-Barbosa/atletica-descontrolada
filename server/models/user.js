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
        default: "https://img.flaticon.com/icons/png/512/1998/1998728.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF"
    }
})

module.exports = mongoose.model('User', user)