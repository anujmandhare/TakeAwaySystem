const express = require('express')
const router = express.Router()

const OrderController = require('../controller/OrderController');

router.get('/getAllOrders', OrderController.getAllOrders);
router.post('/placeOrder', OrderController.placeOrder);
router.post('/updateStatus', OrderController.updateStatus);


module.exports = router;