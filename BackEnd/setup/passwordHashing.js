const bcrypt = require('bcrypt');


const CONSTANTS = require('./constants.json');


const hashedPassword = async (password) => {
    return bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)
        .then(hashedPassword => {
            return hashedPassword
        })
        .catch(error => {
            throw Error(CONSTANTS.INTERNAL_SERVER, { cause: 'Unable to Register User' });
        });
}


const hashCompare = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
        .then(response => {
            return response;
        })
        .catch(error => {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Incorrect Password' });
        });
}


module.exports = {
    hashedPassword, hashCompare
}