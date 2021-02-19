const Son = require('../models/son');

module.exports.register = async (req, res, next) => {
    try {
        let { email, username, password } = req.body;
        username = email;
        const son = new Son({ email, username });
        await Son.register(son, password);
        res.send('Rejestracja powiodła się');
    } catch (e) {
        res.send(e);
    }
}