const domainDetails = require('../controllers/domains.server.controllers');

module.exports = function(app) {
    app.route('/api/updateDomainBasedScore').post(domainDetails.updateDomainBasedScore);
}