const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamsSchema = new Schema({
    teamName: {
        type: String,
        unique: true
    },
    teamScore: {
        type: Number,
    },
});
mongoose.model("TeamsModel", TeamsSchema);