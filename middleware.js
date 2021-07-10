module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        console.log('You must be logged in');
        // req.flash('error', 'You must be signed in first!');
        return res.redirect('/');
    }
    next();
}