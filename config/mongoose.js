//Load module dependencies
const mongoose = require('mongoose');
const config = require('./config');


//Define mongoose configuration here

module.exports = function() {
    mongoose.Promise = global.Promise;
    mongoose.connect('localhost/QuizUpApp');
    var db = mongoose.connection;

    //const db = mongoose.connect(config.db);

    //Load the user model
    require('../models/user.server.model');
    require('../models/questions.server.model');
    require('../models/testDetails.server.model');
    require('../models/readingMaterialLinks.server.model');
    require('../models/teams.server.model');
    require('../models/domains.server.model');
    require('../models/admins.server.model');
    return db;

}