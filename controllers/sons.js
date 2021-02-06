const Son = require('../models/son');

module.exports.register = async (reg, res, next) => {
    try {
        res.send('to jest kontroler rejestrownia son')
    } catch (e) {
        console.log(e);
    }
}