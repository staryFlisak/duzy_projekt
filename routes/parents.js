const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const parents = require('../controllers/parents');

router.get('/', catchAsync(parents.index));

router.route('/:id')
    .get(catchAsync(parents.showParent))
    .delete(catchAsync(parents.deleteParent));

router.route('/register')
.post(catchAsync(parents.register));

router.put('/edit/:id', catchAsync(parents.editParent));

module.exports = router;