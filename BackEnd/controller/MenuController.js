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

        const { name, price, ingredients, _id } = new Menu(req.body);

        const data = await Menu.findByIdAndUpdate(_id, { name, price, ingredients }, { new: true });

        if (data) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Item updated Successfully.`);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Incorrect Data' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteMenuItem = async (req, res, next) => {
    try {

        const doc = await Menu.deleteOne({ _id: req.body.id });

        if (doc.deletedCount) {
            return res.status(CONSTANTS.STATUS_CODE.OK).send(`Menu item deleted successfully.`);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Error in deleting item.' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addMenuItem, updateMenuItem, getAllMenuItems, deleteMenuItem
}; 