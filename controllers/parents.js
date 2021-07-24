const moment = require('moment');
const ParentProfile = require('../models/parentProfile');

module.exports.index = async (req, res) => {
    const {ageMin = 24, ageMax = 99, city = '.*'} = req.query;
    const yearMax = moment().subtract(ageMin, 'years').format('YYYY');
    const yearMin = moment().subtract(ageMax, 'years').format('YYYY');
    let parents = await ParentProfile.find( { "address.city": { $regex: `${city}`, $options: 'i' } }, 'name address job doughters' );
    parents = parents.filter(p => {
        return p.doughters.some(d => d.yearOfBirth >= yearMin && d.yearOfBirth <= yearMax);
    })
    res.json(parents);
}

// module.exports.showParent = async (req, res) => {
//     const parent = await Parent.findById(req.params.id, 'name surname dateOfBirth address job education hobbies aboutYou images socialMedia');
//     res.json(parent);
// }

module.exports.register = async (reg, res, next) => {
    try {
        res.send('to jest kontroler rejestrownia parent')
    } catch (e) {
        console.log(e);
    }
}

module.exports.editParent = async (reg, res, next) => {
    try {
        res.send('to jest kontroler edytowania parent POST')
    } catch (e) {
        console.log(e);
    }
}

module.exports.deleteParent = async (reg, res, next) => {
    try {
        res.send('to jest kontroler usuwania parent DELETE')
    } catch (e) {
        console.log(e);
    }
}