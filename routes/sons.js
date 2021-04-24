const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const sons = require('../controllers/sons');

router.get('/', catchAsync(sons.index));


router.route('/register')
.post(catchAsync(sons.register));

module.exports = router;