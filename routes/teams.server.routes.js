const teamsDetails = require('../controllers/teams.server.controllers');

module.exports = function(app) {
    app.route('/api/getTeamScore').get(teamsDetails.getAllTeamScores);
    app.route('/api/updateTeamScore').post(teamsDetails.updateTeamScore);
}