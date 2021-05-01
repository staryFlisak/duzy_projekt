const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Parent = require('../models/parent');
const parents = require('../controllers/parents');

router.get('/', catchAsync(parents.index));

router.get('/:id', catchAsync(parents.showParent));

router.route('/register')
.post(catchAsync(parents.register));

module.exports = router;