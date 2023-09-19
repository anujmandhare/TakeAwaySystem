const Order = require('../models/OrderModel');
const Menu = require('../models/MenuModel');
const CONSTANTS = require('../setup/constants.json');
const schedule = require('node-schedule');


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

const onlineOrder = async (req, res, next) => {
    try {
        if (req.body.queryResult) {
            const temp = req.body.queryResult.outputContexts[0].parameters.MenuItems.split(/[,&]/);
            let menuItems = [];
            temp.forEach(e => {
                const acs = e.split(/and/);
                menuItems = [...menuItems, ...acs]
            })
            const name = req.body.queryResult.outputContexts[0].parameters.person.name;

            const data = await menuItems.reduce(async (acc, ele, i) => {
                let ac;
                if (ele !== 'and') {
                    ac = await acc;
                    const regex = new RegExp(ele.trim(), "i");
                    const d = await Menu.findOne().where({ name: regex });
                    if (d) {
                        ac.push({ name: d.name, price: d.price, quantity: 1 });
                    }
                }
                return ac;
            }, Promise.resolve([]));



            const order = new Order({ date: new Date(), username: name, feedback: '', status: 'Placed', note: '', data });
            const doc = await order.save();
            return res.status(CONSTANTS.STATUS_CODE.OK).send({ "message": "Order Placed" });
        }
    } catch (error) {
        next(error);
    }
};

const placeOrder = async (req, res, next) => {
    try {

        const payload = new Order(req.body);
        const date = new Date(payload.date);
        let doc;
        let newDoc;
        let futureOrder = false;

        doc = await payload.save();

        const id = doc.id;

        if (date > new Date()) {
            await schedule.scheduleJob(date, async () => {
                const dd = await Order.findById(id);
                if (dd.status !== 'Cancelled') {
                    newDoc = await Order.findByIdAndUpdate(id, { status: 'Placed' }, { new: true });
                }
            });
            futureOrder = true;
        }

        if (doc && !futureOrder) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Order Placed successfully.`);
        } else if (futureOrder) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Future Order scheduled for ${new Date(payload.date).toLocaleString()} successfully. Once time order status will change to placed.`);
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
    placeOrder, getAllOrders, updateStatus, onlineOrder
}; 