const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const sons = require('../controllers/sons');

router.get('/', isLoggedIn, catchAsync(sons.index));

router.get('/:id', catchAsync(sons.showSon));


router.route('/register')
.post(catchAsync(sons.register));

module.exports = router;