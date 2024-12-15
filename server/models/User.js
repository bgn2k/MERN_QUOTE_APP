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
    isVerified  : {
        type : Boolean,
        default: false
    },
    my_collection : {
        type : [{
            q : String,
            a : String
        }],
        default : []
    },
    dob : {
        type : String,
        required : true
    }
},{collection : 'user-data'})

const User = mongoose.model('User', userSchema)

module.exports = User