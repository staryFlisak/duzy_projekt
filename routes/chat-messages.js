const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Chat = require('../models/chat');
const chatMessages = require('../controllers/chat-messages');

router.route('/')
.post(catchAsync(chatMessages.register));

module.exports = router;