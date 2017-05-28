// var router = express.Router();
const users = require('../controllers/users.server.controllers');
const passport = require('passport');
// var router = express.Router();

module.exports = function(app) {
    // var router = app.Router();
    // router.route('/api/signup').post(users.signup());
    // console.log(app.config);
    //for signUp

    app.route('/api/signup').post(users.signup);

    //for Login
    app.route('/api/login').post(users.signin);
    app.route('/api/getUsersList').get(users.getAllUsersList);
    app.route('/api/updateUserScore').post(users.updateUserScore);
    app.route('/api/getUserTestsList').post(users.getUserTestsList);
    app.route('/api/deleteUserBasedOnUserName').post(users.deleteUserBasedOnUserName);
    app.route('/api/getUsersTeamName').post(users.getUsersTeamName);
    // app.post('/login',
    //     passport.authenticate('local', {
    //         successRedirect: '/home',
    //         failureRedirect: '/login'
    //     }));
    //for signout
    app.route('/api/signout').get(users.signout);

    // module.exports = app.route;
}