const express = require('express')
const router = express.Router()

const MenuController = require('../controller/MenuController');

router.post('/addMenuItem', MenuController.addMenuItem);
router.post('/updateMenuItem', MenuController.updateMenuItem);
router.get('/getAllMenuItems', MenuController.getAllMenuItems);
router.post('/deleteMenuItem', MenuController.deleteMenuItem);

module.exports = router;