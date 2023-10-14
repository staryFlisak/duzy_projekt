const SonProfile = require('./models/sonProfile');
const ParentProfile = require('./models/parentProfile');
const {Chat, Message} = require('./models/chat');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        return res.json({'error': 'You must be logged in'});
    }
    next();
}

module.exports.isProfileOwner = function (options) {
    return async function (req, res, next) {
        let isOwner = false;
        switch(options.type) {
            case 'son':
                const foundSon = await SonProfile.findById(req.params.id).populate({
                    path: 'owner',
                    select: '_id'
                });
                isOwner = foundSon && foundSon.owner._id.equals(req.user._id) ? true : false;
                break;
            case 'parent':
                const foundParent = await ParentProfile.findById(req.params.id).populate({
                    path: 'owner',
                    select: '_id'
                });
                isOwner = foundParent && foundParent.owner._id.equals(req.user._id) ? true : false;
                break;
            default:
                return res.json({'error': 'We have some technical difficulties'});
        }
        if(isOwner) {
            next();
        } else {
            return res.json({'error': 'You are not the owner of this profile'});
        }
    }
}

module.exports.isChatOwner = function () {
    return async function (req, res, next) {
        const foundChat = await Chat.findById(req.params.chatId).populate('chattingParent').populate('chattingSon');
        const foundParent = await ParentProfile.findById(foundChat.chattingParent._id).populate({
            path: 'owner',
            select: '_id'
        })
        const foundSon = await SonProfile.findById(foundChat.chattingSon._id).populate({
            path: 'owner',
            select: '_id'
        })
        if ((foundParent && foundParent.owner._id.equals(req.user._id)) || (foundSon && foundSon.owner._id.equals(req.user._id))) {
            next();
        } else {
            return res.json({'error': 'Cos poszlo nie tak :('});
        }
    }
}

module.exports.isMessageOwner = function () {
    return async function (req, res, next) {
        const foundChat = await Chat.findById(req.params.chatId).populate('messages');
        const foundMessage = await foundChat.messages.find(message => message._id.equals(req.params.messageId)).populate({
            path: 'sender',
            select: '_id'
        });
        if(foundMessage && foundMessage.sender._id.equals(req.user._id)) {
            next();
        } else {
            return res.json({'error': 'Cos poszlo nie tak :('});
        }

    }
}