const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Son = require('../models/son');
const sons = require('../controllers/sons');

router.route('/register')
.post(catchAsync(sons.register));

module.exports = router;