const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const TestDetailsSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    domain: String,
    description: String,
    questions: [{
        questionName: String,
        options: [String],
        correctOptionIndex: Number
    }]
});
mongoose.model("TestDetailsModel", TestDetailsSchema);