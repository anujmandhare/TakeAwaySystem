const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController');
const OrderController = require('../controller/OrderController');
const { userVerification } = require('../otherFiles/emailVerification');
const { authenticateJWT } = require('../otherFiles/authenticateToken');

router.get('/verify/*', userVerification);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/onlineOrder', OrderController.onlineOrder);
router.use(authenticateJWT);
router.post('/update', UserController.update);


module.exports = router;