const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureMessage: 'Logowanie nie powiodło się'}), users.login)

router.get('/logout', users.logout)

module.exports = router;