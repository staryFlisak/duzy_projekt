const Parent = require('../models/parent');

module.exports.register = async (reg, res, next) => {
    try {
        res.send('to jest kontroler rejestrownia parent')
    } catch (e) {
        console.log(e);
    }
}