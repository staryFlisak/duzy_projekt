const Admin = require('../models/admin');

module.exports.register = async (reg, res, next) => {
    try {
        res.send('to jest kontroler rejestrownia admin')
    } catch (e) {
        console.log(e);
    }
}