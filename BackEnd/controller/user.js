const User = require('../models/User');
const CONSTANTS = require('../setup/constants.json')
const { hashedPassword, hashCompare } = require('../setup/passwordHashing');
const { authenticateJWT, createToken } = require('../setup/authenticateToken');


const login = async (req, res, next) => {
    try {

        const { username, password } = new User(req.body);

        const data = await User.findOne({ username });

        const passwordCheck = await hashCompare(password, data.password);

        if (data && passwordCheck) {
            const jwtToken = createToken(username);
            return res.status(CONSTANTS.STATUS_CODE.OK).send({ jwtToken, username });
        } else {
            throw Error(CONSTANTS.UNAUTHORISED, { cause: 'Incorrect email or Password!' });
        }
    } catch (error) {
        next(error);
    }
}


const register = async (req, res, next) => {
    try {

        const payload = new User(req.body);
        const idAvailable = await User.findOne({ username: payload.username });

        if (!idAvailable) {
            payload.password = await hashedPassword(payload.password);

            const data = await payload.save()
            const jwtToken = createToken(data.username);

            res.status(CONSTANTS.STATUS_CODE.OK).send({ username: data.username, jwtToken });
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'User already registered' });
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    login, register
}; 