const User = require('../models/user');
const ParentProfile = require('../models/parentProfile');

module.exports.index = async (req, res) => {
    const { sonAgeMin = 18, sonAgeMax = 99, city = '.*' } = req.query;
    let parents = await ParentProfile.find({ "sonAgeMin": { $gte: sonAgeMin }, "sonAgeMax": { $lte: sonAgeMax }, "address.city": { $regex: `${city}`, $options: 'i' } }, 'name address job doughters');
    res.json(parents);
}

module.exports.showParent = async (req, res) => {
    const parent = await ParentProfile.findById(req.params.id, 'name surname dateOfBirth address job education hobbies aboutYou images socialMedia');
    res.json(parent);
}

module.exports.register = async (req, res, next) => {
    const { email, name, password, job, hobbies, address, sonAgeMin, sonAgeMax, doughters } = req.body;
    const user = new User({ email, name, role: 'parent' });
    // res.send("To jest kontroler rejestrowania parent");
    let registeredUser = {};
    try {
        registeredUser = await User.register(user, password);
    } catch (e) {
        return res.send("Taki uzytkownik juz jest");
    }
    if(Object.keys(registeredUser).length !== 0) {
        const parentProfile = new ParentProfile({
            owner: registeredUser._id,
            job,
            hobbies,
            address,
            sonAgeMin,
            sonAgeMax,
            doughters
        });
        try {
            parentProfile.save();
        } catch (e) {
            console.log(e);
        }
        req.login(registeredUser, err => {
            if (err) return next(err);
            return res.json({"message": 'Jesteś zalogowany!', "userId": registeredUser._id});
        })
    }
}

module.exports.updateParent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const parentProfile = await ParentProfile.findByIdAndUpdate(id, { ...req.body });
        await parentProfile.save();
    } catch (e) {
        return res.json({"message": "There was some issue with updating your profile"});
    }
    return res.json({"message": "Your profile has beed updated!"});
}