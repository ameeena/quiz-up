const ReadingMaterials = require('mongoose').model('ReadingMaterialsModel');


exports.getReadingMaterialLinks = function(req, res) {
    ReadingMaterials.find({}, function(error, results) {
        if (error) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(results);
        }
    })
};

exports.addReadingMaterials = function(req, res) {
    const readingMaterialData = new ReadingMaterials(req.body);
    readingMaterialData.save(function(err, results) {
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
                message = 'Display name already exists.';
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