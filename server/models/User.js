const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    quote : {
        type : String
    }
},{collection : 'user-data'})

const User = mongoose.model('User', userSchema)

module.exports = User