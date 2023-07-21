const Menu = require('../models/MenuModel');
const CONSTANTS = require('../setup/constants.json');


const getAllMenuItems = async (req, res, next) => {
    try {

        const data = await Menu.find({});

        if (data) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(data);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Cannot fetch Menu Items' });
        }
    } catch (error) {
        next(error);
    }
};


const addMenuItem = async (req, res, next) => {
    try {

        const payload = new Menu(req.body);

        const data = await Menu.findOne({ name: payload.name });

        if (data) {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Item already exists in the Menu!' });
        }

        const doc = await payload.save();

        if (doc) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Item ${payload.name} added to the menu.`);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Incorrect Data' });
        }
    } catch (error) {
        next(error);
    }
};


const updateMenuItem = async (req, res, next) => {
    try {

        const { name, price, ingredients } = new Menu(req.body);

        const data = await Menu.findByIdAndUpdate({ name }, { name, price, ingredients }, { new: true });

        return;
        if (data) {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Item already exists in the Menu!' });
        }

        const doc = await payload.save();

        if (doc) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Item ${payload.name} added to the menu.`);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Incorrect Data' });
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    addMenuItem, updateMenuItem, getAllMenuItems
}; 