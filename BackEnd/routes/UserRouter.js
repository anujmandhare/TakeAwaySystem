const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController');
const { userVerification } = require('../otherFiles/emailVerification');

router.get('/verify/*', userVerification);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/update', UserController.update);


module.exports = router;