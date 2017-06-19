const config = require('./config');
const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Define express configuration method

module.exports = function() {
    //create an express application instance
    const app = express();
    //Based on NODE_ENV variable , morgan or compress activation

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    //body parser and method overide
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // app.use(app.router);
    //configure session middle ware

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    //View engine
    app.set('views', './views');
    app.set('view engine', 'ejs');
    // app.engine('html', require('ejs').renderFile);

    //configure flash middleware
    app.use(flash());

    //Configure passport
    app.use(passport.initialize());
    app.use(passport.session());

    //configure static file serving
    //Set static folder
    app.use('/', express.static('public'));
    app.use('/lib', express.static(path.resolve('./node_modules')));

    //
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });



    // var questions = require('../routes/questions');
    // var users = require('../routes/users.server.routes');
    // var index = require('../routes/index');

    // // app.use('/api', questions);
    // app.use('/api', users);
    // app.use('/', index);

    // Load the routing files	
    require('../routes/users.server.routes.js')(app);
    // require('../routes/questions.server.routes.js')(app);
    require('../routes/testDetails.server.routes.js')(app);
    require('../routes/readingMaterialLinks.server.routes.js')(app);
    require('../routes/teams.server.routes')(app);
    require('../routes/domains.server.routes')(app);
    require('../routes/admin.server.routes')(app);
    require('../routes/index.js')(app);
    return app;
};