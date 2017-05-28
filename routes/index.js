// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.render('index.html');
// });

// module.exports = router;

// Load the 'index' controller
const index = require('../controllers/index.server.controllers');

// Define the routes module' method
module.exports = function(app) {
    // Mount the 'index' controller's 'render' method
    app.get('/*', index.render);
};