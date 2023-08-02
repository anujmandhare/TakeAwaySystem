const jwt = require('jsonwebtoken');


const CONSTANTS = require('../setup/constants.json');


const createToken = ({ username, role }) => {
    const accessToken = jwt.sign({ username, role }, CONSTANTS.SECRET);
    return accessToken;
}


const authenticateJWT = (request, response, next) => {
    const token = request.headers.authorization;

    if (token) {

        jwt.verify(token, CONSTANTS.SECRET, (error, user) => {
            if (error) {
                throw Error(CONSTANTS.FORBIDDEN);
            }

            request.user = user;
            next();
        });
    } else {
        throw Error(CONSTANTS.UNAUTHORISED);
    }
};

module.exports = {
    authenticateJWT, createToken
}