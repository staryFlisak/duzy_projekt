const Chat = require('../models/chat');

module.exports.register = async (reg, res, next) => {
    try {
        res.send('to jest kontroler rejestrownia chatu')
    } catch (e) {
        console.log(e);
    }
}