const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isOwner} = require('../middleware');
const sons = require('../controllers/sons');

router.get('/', isOwner({option1: '1'}), isLoggedIn, catchAsync(sons.index));

router.get('/:id', catchAsync(sons.showSon));


router.route('/register')
.post(catchAsync(sons.register));

module.exports = router;