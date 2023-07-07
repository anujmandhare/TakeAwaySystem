var express = require('express');
const cors = require('cors');

const { PORT } = require('./setup/constants.json');
const errorHandler = require('./setup/errorHandler');
const database = require('./setup/mongoConnection');
const user = require('./controller/user');

var app = express();

database.on('error', console.error.bind(console, 'Database connection error'))

app.use(express.json());
app.use(cors());

app.post('/login', user.login);
app.post('/register', user.register);

app.use(errorHandler);

//Listen to port for Server
app.listen(PORT, () => console.log('Server listening on http://localhost:' + PORT + '/'));

//Export Server
module.exports = app;
