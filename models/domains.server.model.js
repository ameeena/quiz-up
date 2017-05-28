const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DomainSchema = new Schema({
    domainName: {
        type: String,
        unique: true
    },
    tests: [{
        testName: String,
        totalScore: Number,
        totalUsers: Number,
        averageScore: Number
    }],
});

mongoose.model("DomainModel", DomainSchema);