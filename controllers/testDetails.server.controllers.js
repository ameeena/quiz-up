const TestDetails = require('mongoose').model('TestDetailsModel');


exports.addTest = function(req, res) {
    const testData = new TestDetails(req.body);
    // testData.testName = req.body.testName;
    // testData.domain = req.body.genre;
    testData.save(function(err) {
        if (err) {
            // res.send(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.send({
                message: "Test added successfully!!"
            })
        }
    });
}

exports.getTestsList = function(req, res) {
    TestDetails.find({}, function(err, results) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(results);
        }
    });
}
exports.getTestsBasedOnId = function(req, res) {
    id = req.body._id;
    TestDetails.findById(id, function(err, results) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(results);
            }
        })
        // intercept OPTIONS method
}

exports.deleteTestsBasedOnId = function(req, res) {
    let testId = req.body._id;
    TestDetails.remove({ _id: testId }, function(err, results) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.send({
                message: "Test is removed successfully!!"
            })
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
                message = 'Test name already exists.';
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