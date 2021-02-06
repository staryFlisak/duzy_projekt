const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: String,
    isRead: Boolean,
    date: { type: Date, default: Date.now },
    isAddresseeInformed: Boolean
});

const ChatSchema = new Schema({
    chatingParent: {
        type: Schema.Types.ObjectId,
        ref: 'Parent'
    },
    chatingSon: {
        type: Schema.Types.ObjectId,
        ref: 'Son'
    },
    messages: [MessageSchema]
})