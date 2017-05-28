//Load module dependency

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

//Define User Schema
// Create a schema
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: "user name is required",
        trim: true
    },
    userPassword: {
        type: String,
        required: 'password is reqired',
        validate: [
            (userPassword) => userPassword.length > 6 && userPassword,
            'password should be longer'
        ]
    },
    salt: {
        type: String,
    },
    provider: {
        type: String,
        // Validate 'provider' value existance
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    userEmail: String,
    userScore: Number,
    isLoggedIn: Boolean,
    userRole: String,
    teamName: String,
    testsTaken: [{
        testId: String,
        testName: String,
        domainName: String,
        answers: [{
            questionId: String,
            selectedIndex: Number,
            correctIndex: Number
        }],
        testScore: Number
    }],
    updated_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', function(next) {
    if (this.userPassword) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.userPassword = this.hashPassword(this.userPassword);
    }
    next();
});

UserSchema.methods.hashPassword = function(passwordVal) {
    return crypto.pbkdf2Sync(passwordVal, this.salt, 10000, 64).toString('base64');
}


//create a method for authenticating the user.
UserSchema.methods.authenticate = function(passwordVal) {
    return this.userPassword === this.hashPassword(passwordVal);
}
mongoose.model('User', UserSchema);