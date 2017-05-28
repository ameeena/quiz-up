const readingMaterial = require('../controllers/readingMaterialLinks.controller.server');

module.exports = function(app) {
    app.route('/api/getReadingMaterials').get(readingMaterial.getReadingMaterialLinks);
    app.route('/api/addReadingMaterials').post(readingMaterial.addReadingMaterials);
}