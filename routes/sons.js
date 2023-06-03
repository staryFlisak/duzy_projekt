const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isProfileOwner} = require('../middleware');
const sons = require('../controllers/sons');

router.get('/', isLoggedIn, catchAsync(sons.index));

router.route('/:id')
    .get(isLoggedIn, catchAsync(sons.showSon))
    .delete(isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.deleteSon))


router.route('/register')
.post(catchAsync(sons.register));

router.put('/edit/:id', isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.updateSon));

router.get('/:id/parentswithrequestsent', isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.parentsWithRequestSentShow));
router.post('/:id/parentswithrequestsent/:parentid', isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.parentsWithRequestSentRegister));
router.delete('/:id/parentswithrequestsent/:parentid', isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.parentsWithRequestSentDelete));

router.get('/:id/parentswhowanttobeadded', isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.parentsWhoWantToBeAddedShow));
router.post('/:id/parentswhowanttobeadded/:parentid', isLoggedIn, isProfileOwner({type: 'son'}), catchAsync(sons.parentsWhoWantToBeAddedAccept));

module.exports = router;