const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['seller', 'vendor', 'admin'],
        required: true

    },

    email: {
        type: String,
        required: true,
    },

    image: String
})

const User = mongoose.model('User', userSchema)
module.exports = User