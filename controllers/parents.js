const User = require('../models/user');
const ParentProfile = require('../models/parentProfile');

module.exports.index = async (req, res) => {
    const { sonAgeMin = 18, sonAgeMax = 99, city = '.*' } = req.query;
    let parents = await ParentProfile.find({ "sonAge": { $gte: sonAgeMin, $lte: sonAgeMax }, "address.city": { $regex: `${city}`, $options: 'i' } }, 'name address job doughters');
    res.json(parents);
}

module.exports.showParent = async (req, res) => {
    const parent = await ParentProfile.findById(req.params.id, 'name surname dateOfBirth address job education hobbies aboutYou images socialMedia');
    res.json(parent);
}

// module.exports.register = async (reg, res, next) => {

//     const { email, name, password, job, hobbies, address, sonAge, doughters } = req.body;
//     const user = new User({ email, name, role: 'parent' });
//     const registeredUser = await User.register(user, password);

//     req.login(registeredUser, err => {
//         if (err) return next(err);
//         res.send('Jesteś zalogowany!');
//     })

// }

// module.exports.editParent = async (reg, res, next) => {
//     try {
//         res.send('to jest kontroler edytowania parent POST')
//     } catch (e) {
//         console.log(e);
//     }
// }

// module.exports.deleteParent = async (reg, res, next) => {
//     try {
//         res.send('to jest kontroler usuwania parent DELETE')
//     } catch (e) {
//         console.log(e);
//     }
// }