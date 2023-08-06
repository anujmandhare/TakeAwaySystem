const Order = require('../models/OrderModel');
const CONSTANTS = require('../setup/constants.json');


const getAllOrders = async (req, res, next) => {
    try {

        const username = req.query.username;
        const role = req.user?.role;
        let doc;

        if (role !== 'Customer') {
            doc = await Order.find();
        } else {
            doc = await Order.find({ username });
        }

        if (doc.length) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(doc.sort((a, b) => a.date < b.data ? 0 : -1));
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Error in fetching orders.' });
        }
    } catch (error) {
        next(error);
    }
};

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

const updateStatus = async (req, res, next) => {
    try {

        const { status, feedback } = new Order(req.body);

        const doc = await Order.findByIdAndUpdate(req.body.id, { status, feedback }, { new: true });

        if (doc) {
            if (feedback) {
                return res.status(CONSTANTS.STATUS_CODE.OK).send(`Feedback submitted successfully.`);
            } else {
                return res.status(CONSTANTS.STATUS_CODE.OK).send(`Status updated to ${status}`);
            }
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Error in placing order.' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    placeOrder, getAllOrders, updateStatus
}; 