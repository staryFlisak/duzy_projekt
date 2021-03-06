const moment = require('moment');
const SonProfile = require('../models/sonProfile');

module.exports.index = async (req, res) => {
    const {ageMin = 18, ageMax = 99, city = '.*'} = req.query;
    const dateMax = moment().subtract(ageMin, 'years').format('YYYY-MM-DD');
    const dateMin = moment().subtract(ageMax, 'years').format('YYYY-MM-DD');
    const sons = await SonProfile.find( { dateOfBirth: { $gte: dateMin, $lte: dateMax }, "address.city": { $regex: `${city}`, $options: 'i' } }, 'dateOfBirth address job images' ).populate('owner', 'name');
    res.json(sons);
}

module.exports.showSon = async (req, res) => {
    const son = await SonProfile.findById(req.params.id, 'dateOfBirth address job education hobbies aboutYou images socialMedia');
    res.json(son);
}

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