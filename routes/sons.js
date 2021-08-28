const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isOwner} = require('../middleware');
const sons = require('../controllers/sons');

router.get('/', isLoggedIn, catchAsync(sons.index));

router.route('/:id')
    .get(isLoggedIn, catchAsync(sons.showSon))
    .delete(isLoggedIn, isOwner, catchAsync(sons.deleteSon))


router.route('/register')
.post(catchAsync(sons.register));

router.put('/edit/:id', isLoggedIn, isOwner({option1: 1}), catchAsync(sons.editSon));

module.exports = router;