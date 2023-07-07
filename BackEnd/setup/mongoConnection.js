const mongoose = require('mongoose');

const CONSTANTS = require('./constants.json');

const connection = async () => {
    try {
        await mongoose.connect(CONSTANTS.DATABASE.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

connection();

const database = mongoose.connection

module.exports = database