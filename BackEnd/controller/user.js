const User = require('../models/User');
const CONSTANTS = require('../setup/constants.json');
const { hashedPassword, hashCompare } = require('../otherFiles/passwordHashing');
const { authenticateJWT, createToken } = require('../otherFiles/authenticateToken');
const { userVerification, sendVerificationMail } = require('../otherFiles/emailVerification');


const login = async (req, res, next) => {
    try {

        const { username, password } = new User(req.body);

        const data = await User.findOne({ username });

        if (!data.verified) {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Please verify your email first!' });
        }

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

            await sendVerificationMail(payload.username);
            const data = await payload.save()
            res.send(`User ${'name'} registered with id ${payload.username}!!! \nPlease verify your email by clicking on the link received in your email.`);

            // res.status(CONSTANTS.STATUS_CODE.OK).send({ username: payload.username });
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