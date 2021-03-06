// Create a new 'render' controller method
exports.render = function(req, res) {
    // Set the safe user object 
    const user = (!req.user) ? null : {
        _id: req.user.id,
    };

    // Use the 'response' object to render the 'index' view with a 'title' and 'user' properties
    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(user)

    });
};