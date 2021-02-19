const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');

router.route('/login')
    .post(passport.authenticate('local', {failureFlash: true, failureMessage: 'Logowanie nie powiodło się'}), users.login)

router.get('/logout', users.logout)

module.exports = router;