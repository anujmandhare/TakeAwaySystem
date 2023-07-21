var express = require('express');
const cors = require('cors');

const { PORT } = require('./setup/constants.json');
const UserRouter = require('./routes/UserRouter');
const MenuRouter = require('./routes/MenuRouter');
const errorHandler = require('./otherFiles/errorHandler');
const database = require('./setup/mongoConnection');

var app = express();

database.on('error', console.error.bind(console, 'Database connection error'))

app.use(express.json());
app.use(cors());

app.use('/user', UserRouter);
app.use('/menu', MenuRouter);

app.use(errorHandler);

//Listen to port for Server
app.listen(PORT, () => console.log('Server listening on http://localhost:' + PORT + '/'));

//Export Server
module.exports = app;
