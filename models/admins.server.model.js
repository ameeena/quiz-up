const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    emailId: {
        type: String,
        unique: true,
    },

});

mongoose.model('AdminList', AdminSchema);