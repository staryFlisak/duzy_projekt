const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const chatMessages = require('../controllers/chat-messages');
const {isLoggedIn, isProfileOwner, isChatOwner} = require('../middleware');

//chat CRUD
router.route('/:id')
    .get(isLoggedIn, catchAsync(chatMessages.showChat));

router.route('/register')
    .post(catchAsync(chatMessages.registerChat));

//messages CRUD
router.route('/:chatId/messages/:messageId')
    .get(isLoggedIn, catchAsync(chatMessages.showMessage))
    .delete(isLoggedIn, isProfileOwner({type: 'parent'}), catchAsync(chatMessages.deleteMessage));

router.route('/:chatId/messages/register')
    .post(isLoggedIn, isChatOwner(), catchAsync(chatMessages.registerMessage));

// router.put('/:chatId/messages/edit/:messageId', isLoggedIn, isProfileOwner({type: 'parent'}), catchAsync(chatMessages.updateMessage));

module.exports = router;