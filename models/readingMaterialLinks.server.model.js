const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReadingMaterialLinksSchema = new Schema({
    displayName: {
        type: String,
        unique: true
    },
    link: {
        type: String,
        unique: true
    },
    domainName: String
});

mongoose.model("ReadingMaterialsModel", ReadingMaterialLinksSchema);