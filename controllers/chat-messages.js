const { Chat, Message } = require('../models/chat');

module.exports.registerChat = async (req, res, next) => {
    const { parentId, sonId } = req.body;
    const chat = new Chat({ chattingParent: parentId, chattingSon: sonId });
    await chat.save();
}

module.exports.showChat = async (req, res) => {
    const chat = await Chat.findById(req.params.id).populate('chattingParent', 'name').populate('chattingSon', 'name').populate('messages');
    res.json(chat);
}

module.exports.showMessage = async (req, res) => {
    const chat = await Chat.findById(req.params.chatId).populate('messages');
    const message = chat.messages.find(message._id === req.params.messageId);
    res.json(message);
}

module.exports.deleteMessage = async (req, res) => {
    const chat = await Chat.findById(req.params.chatId).populate('messages');
    const message = chat.messages.find(message._id === req.params.messageId);
    message.text = '';
    message.isAddresseeInformed = true;
    message.wasDeleted = true;
    try {
        await message.save();
    } catch (e) {
        console.log(e);
    }

}

module.exports.registerMessage = async (req, res) => {
    const { text } = req.body;
    const message = new Message({ text, sender: req.user._id });
    const chat = await Chat.findById(req.params.chatId).populate('messages');
    chat.messages.push(message);
    try {
        await chat.save();
    } catch (err) {
        return res.json({"message": "There was some issue with adding your message"});
    }
    return res.json({ "message": "Wiadomość wysłana"});
}

// module.exports.updateMessage = async (req, res) => {

// }