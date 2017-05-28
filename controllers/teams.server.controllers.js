const TeamDetails = require('mongoose').model('TeamsModel');

exports.updateTeamScore = function(req, res) {
    var teamname = req.body.teamName;
    var teamscore = req.body.teamScore;

    TeamDetails.findOne({ teamName: teamname }, 'teamScore', function(err, results) {
        if (err) {
            res.send(err);
        } else {
            if (results != null) {
                teamscore += results.teamScore;
            }
            var teamDetails = {
                teamName: teamname,
                teamScore: teamscore
            }
            TeamDetails.update({ teamName: teamname }, teamDetails, { upsert: true }, function(results, err) {
                console.log(err);
            });
        }
    })
};
exports.getAllTeamScores = function(req, res) {
    TeamDetails.find().sort({ teamScore: 'desc' }).exec(function(err, results) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(results);
        }
    });
}
const getErrorMessage = function(err) {
    // Define the error message variable
    let message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = '';
                break;
                // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    // Return the message error
    return message;
};