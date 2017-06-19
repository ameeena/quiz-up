const adminList = require('..controllers/admins.server.controller.js');

module.exports = function(app) {
    app.route('/api/getAdminList').get(adminList.getAdminList);
}