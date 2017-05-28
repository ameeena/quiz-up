const testDetails = require('../controllers/testDetails.server.controllers');

module.exports = function(app) {
    app.route('/api/addTest').post(testDetails.addTest);
    app.route('/api/getTestsList').get(testDetails.getTestsList);
    app.route('/api/getTestsBasedOnId').post(testDetails.getTestsBasedOnId);
    app.route('/api/deleteTestBasedOnId').post(testDetails.deleteTestsBasedOnId);
}