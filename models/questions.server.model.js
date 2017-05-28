const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestSchema = new Schema({
    testName: {
        type: String,
        unique: true,
    },
    domain: {
        type: String
    },
})

mongoose.model("TestDetails", TestSchema);