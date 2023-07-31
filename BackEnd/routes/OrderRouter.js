const express = require('express')
const router = express.Router()

const OrderController = require('../controller/OrderController');

router.post('/placeOrder', OrderController.placeOrder);


module.exports = router;