const { BAD_REQUEST, UNAUTHORISED, FORBIDDEN, INTERNAL_SERVER } = require('../setup/constants.json');


const errorHandler = (error, req, res, next) => {
    try {
        switch (true) {
            case error.message === BAD_REQUEST:
                res.status(BAD_REQUEST).send(error.cause);
                break;

            case error.message === UNAUTHORISED:
                res.status(UNAUTHORISED).send('Unauthorised access');
                break;

            case error.message === FORBIDDEN:
                res.status(FORBIDDEN).send('User not allowed');
                break;

            default:
                console.log("\nDefault Error in Handler **********  ", error);
                res.status(INTERNAL_SERVER).send(error.message);
        }

    } catch (error) {
        console.log("\nError Handler Error **********  ", error);
        res.status(INTERNAL_SERVER).send("Internal Server Error.");
    }
}

module.exports = errorHandler;