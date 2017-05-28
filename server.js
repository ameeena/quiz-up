process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const configurepassport = require('./config/passport');

//create mongoose instance
const db = configureMongoose();

//create express instance
const app = configureExpress();

//configutre passport

const passport = configurepassport();

var port = 4000;

app.listen(4000);
console.log('Server running at http://localhost:4000/');
module.exports = app;