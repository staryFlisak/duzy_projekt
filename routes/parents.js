const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Parent = require('../models/parent');
const parents = require('../controllers/parents');

router.route('/register')
.post(catchAsync(parents.register));

module.exports = router;