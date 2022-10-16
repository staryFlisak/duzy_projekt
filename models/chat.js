const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    text: String,
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    addressee: {
        type: String,
        enum: ['parent', 'son']
    },
    sender: {
        type: String,
        enum: ['parent', 'son']
    },
    isAddresseeInformed: {type: Boolean, deafult: false },
    wasDeleted: { type: Boolean, default: false }
});

const ChatSchema = new Schema({
    chattingParent: {
        type: Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    },
    chattingSon: {
        type: Schema.Types.ObjectId,
        ref: 'Son',
        required: true
    },
    messages: [MessageSchema]
})

module.exports = mongoose.model('Chat', ChatSchema);