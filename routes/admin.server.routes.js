const adminList = require('..controllers/admin.server.controller.js');

module.exports = function(app) {
    app.route('/api/getAdminList').get(adminList.getAdminList);
}