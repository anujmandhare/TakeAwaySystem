const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        data: { type: Array, required: true },
        note: { type: String, required: false },
        date: { type: Date, required: true },
        status: { type: String, required: true, enum: ['Placed', 'Preparing', 'Prepared', 'Delivered', 'Declined'] },
        username: { type: String, required: true }
    }
)

module.exports = mongoose.model('order', Order)