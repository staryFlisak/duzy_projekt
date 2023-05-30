const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const MessageSchema = new Schema({
    text: String,
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isAddresseeInformed: {type: Boolean, deafult: false },
    wasDeleted: { type: Boolean, default: false }
});

const ChatSchema = new Schema({
    chattingParent: {
        type: Schema.Types.ObjectId,
        ref: 'ParentProfile',
        required: true
    },
    chattingSon: {
        type: Schema.Types.ObjectId,
        ref: 'SonProfile',
        required: true
    },
    messages: [MessageSchema]
})

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

module.exports = {Chat, Message};