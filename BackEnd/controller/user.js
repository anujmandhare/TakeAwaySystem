const User = require('../models/User');
const CONSTANTS = require('../setup/constants.json');
const { hashedPassword, hashCompare } = require('../otherFiles/passwordHashing');
const { createToken } = require('../otherFiles/authenticateToken');
const { sendVerificationMail } = require('../otherFiles/emailVerification');


const login = async (req, res, next) => {
    try {

        const { username, password } = new User(req.body);

        const data = await User.findOne({ username });

        if (!data.verified) {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Please verify your email first!' });
        }

        const passwordCheck = await hashCompare(password, data.password);

        if (data && passwordCheck) {
            const token = createToken({ username, role: data.role });
            return res.status(CONSTANTS.STATUS_CODE.OK).send({ token, username, role: data.role, name: data.name, number: data.number });
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

            //Uncomment below line for skipping email verification
            payload.verified = true;

            // await sendVerificationMail(payload.username);

            await payload.save()
            res.send(`User ${'name'} registered with id ${payload.username}!!! \nPlease verify your email by clicking on the link received in your email.`);

            // res.status(CONSTANTS.STATUS_CODE.OK).send({ username: payload.username });
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'User already registered' });
        }
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {

        const { name, username, number } = new User(req.body);
        const data = await User.updateOne({ username }, { name, number });

        if (data.modifiedCount) {
            res.status(CONSTANTS.STATUS_CODE.OK).send('Profile Updated Successfully!');
        } else {
            throw Error(CONSTANTS.BAD_REQUEST, { cause: 'Nothing to update.' });
        }

    } catch (error) {

        next(error);
    }
};


module.exports = {
    login, register, update
}; 