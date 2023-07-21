const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        number: { type: Number, required: false },
        verified: { type: Boolean, required: true, default: false },
    }
)

module.exports = mongoose.model('user', User)