const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isOwner} = require('../middleware');
const parents = require('../controllers/parents');

router.get('/', isLoggedIn, catchAsync(parents.index));

router.route('/:id')
    .get(isLoggedIn, catchAsync(parents.showParent))
    .delete(isLoggedIn, isOwner, catchAsync(parents.deleteParent));

router.route('/register')
.post(catchAsync(parents.register));

router.put('/edit/:id', isLoggedIn, isOwner, catchAsync(parents.editParent));

module.exports = router;