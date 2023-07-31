const Order = require('../models/OrderModel');
const CONSTANTS = require('../setup/constants.json');


const placeOrder = async (req, res, next) => {
    try {

        const payload = new Order(req.body);

        const doc = await payload.save();

        if (doc) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Order Placed successfully.`);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Error in placing order.' });
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    placeOrder
}; 