module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        console.log('You must be logged in');
        return res.json({'error': 'You must be logged in'});
    }
    next();
}

module.exports.isOwner = function (options) {
    return function (req, res, next) {
        console.log(req.user);
        next();
    }
}