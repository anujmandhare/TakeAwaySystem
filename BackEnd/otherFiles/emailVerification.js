const nodemailer = require('nodemailer');
const CONSTANTS = require('../setup/constants.json');
const User = require('../models/User');

const sendVerificationMail = async (email) => {

    const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user: CONSTANTS.MAIL.email,
            pass: CONSTANTS.MAIL.password
        }
    });

    const verificationLink = `http://localhost:8000/verify/?username=${email}`;
    const mailOptions = {
        from: 'takeawaymenusystem@outlook.com',
        to: email,
        subject: 'Verify your email address',
        text: `Please click on the following link to verify your email address: ${verificationLink}`
    };

    return await transporter.sendMail(mailOptions);
}


const userVerification = async (req, res, next) => {

    try {
        const { username } = req.query;

        const data = await User.updateOne({ username }, { verified: true });

        if (data.modifiedCount) {
            res.status(200).send(`User with email id ${username} is successfully verified!!!`);
        } else {
            throw Error(BAD_REQUEST, { cause: 'User not found please provide valid username.' });
        }

    } catch (error) {

        next(error);
    }
}


module.exports = {
    userVerification, sendVerificationMail
}