const moment = require('moment');
const User = require('../models/user');
const SonProfile = require('../models/sonProfile');
const ParentProfile = require('../models/parentProfile');

module.exports.index = async (req, res) => {
    const { ageMin = 18, ageMax = 99, city = '.*' } = req.query;
    const dateMax = moment().subtract(ageMin, 'years').format('YYYY-MM-DD');
    const dateMin = moment().subtract(ageMax, 'years').format('YYYY-MM-DD');
    const sons = await SonProfile.find({ dateOfBirth: { $gte: dateMin, $lte: dateMax }, "address.city": { $regex: `${city}`, $options: 'i' } }, 'dateOfBirth address job images').populate('owner', 'name');
    res.json(sons);
}

module.exports.showSon = async (req, res) => {
    const son = await SonProfile.findById(req.params.id, 'dateOfBirth address job education hobbies aboutYou images socialMedia');
    res.json(son);
}

module.exports.register = async (req, res, next) => {
    const { email, password, name, surname, dateOfBirth, address, aboutYou, images, job, education, organizations, hobbies, socialMedia } = req.body;
    const user = new User({ email, name, role: 'parent' });
    let registeredUser = {};
    try {
        registeredUser = await User.register(user, password);
    } catch (e) {
        return res.send("Taki uzytkownik juz jest");
    }
    if (Object.keys(registeredUser).length !== 0) {
        const sonProfile = new SonProfile({
            owner: registeredUser._id,
            job,
            surname,
            dateOfBirth,
            aboutYou,
            hobbies,
            address,
            images,
            education,
            organizations,
            socialMedia
        });
        try {
            sonProfile.save();
        } catch (e) {
            console.log(e);
        }
        req.login(registeredUser, err => {
            if (err) return next(err);
            return res.json({ "message": 'Jesteś zalogowany!', "userId": registeredUser._id });
        })
    }
}

module.exports.updateSon = async (req, res, next) => {
    const { id } = req.params;
    try {
        const sonProfile = await SonProfile.findByIdAndUpdate(id, { ...req.body });
        await sonProfile.save();
    } catch (e) {
        return res.json({ "message": "There was some issue with updating your profile" });
    }
    return res.json({ "message": "Your profile has beed updated!" });
}

module.exports.parentsWithRequestSentShow = async (req, res, next) => {
}

module.exports.parentsWithRequestSentRegister = async (req, res, next) => {
    const { id, parentid } = req.params;
    try {
        let sonProfile = await SonProfile.findById(id);
        const isParentFriend = sonProfile.parentsFriends.parentsFriendsArray.some(p => p.equals(parentid));
        const isParentWithRequestSent = sonProfile.parentsWithRequestSent.parentsWithRequestSentArray.some(p => p.equals(parentid));
        const isParentWhoWantToBeAdded = sonProfile.parentsWhoWantToBeAdded.some(p => p.equals(parentid));
        if (isParentFriend) {
            return res.json({ "message": "This parent is already on your friend's list" });
        } else if (isParentWithRequestSent) {
            return res.json({ "message": "You've already sent a request to this parent" });
        } else if (isParentWhoWantToBeAdded) {
            sonProfile.parentsFriends.parentsFriendsArray.push(parentid);
            sonProfile.parentsWhoWantToBeAdded = sonProfile.parentsWhoWantToBeAdded.filter(p => !p.equals(parentid));
            let parentProfile = await ParentProfile.findById(parentid);
            parentProfile.sonsFriend.sonsFriendsArray.push(id);
            parentProfile.sonsWithRequestSent = parentProfile.sonsWithRequestSent.filter(s => !s.equals(id));
            await sonProfile.save();
            await parentProfile.save();
            return res.json({ "message": "This man was on your 'Want To Be Added' list." });
        } else {
            console.log('Nie znalazłem parenta');
            sonProfile.parentsWithRequestSent.parentsWithRequestSentArray.push(parentid);
            await parentProfile.save();
            return res.json({ "message": "You sent a request to this parent." })
        }
    } catch (e) {
        return res.json({ "message": "Something went wrong" });
    }
}

module.exports.parentsWithRequestSentDelete = async (req, res, next) => {
}

module.exports.parentsWhoWantToBeAddedShow = async (req, res, next) => {
}

module.exports.parentsWhoWantToBeAddedAccept = async (req, res, next) => {
    const { id, parentid } = req.params;
    try {
        let sonProfile = await SonProfile.findById(id);
        const isParentFriend = sonProfile.parentsFriends.parentsFriendsArray.some(p => p.equals(parentid));
        const isParentWhoWantToBeAdded = sonProfile.parentsWhoWantToBeAdded.some(p => p.equals(parentid));
        if (isParentFriend) {
            return res.json({ "message": "This parent is already on your friend's list" });
        } else if (isParentWhoWantToBeAdded) {
            sonProfile.parentsFriends.parentsFriendsArray.push(parentid);
            sonProfile.parentsWhoWantToBeAdded = sonProfile.parentsWhoWantToBeAdded.filter(p => !p.equals(parentid));
            let parentProfile = await ParentProfile.findById(parentid);
            parentProfile.sonsFriend.sonsFriendsArray.push(id);
            parentProfile.sonsWithRequestSent = parentProfile.sonsWithRequestSent.filter(s => !s.equals(id));
            await sonProfile.save();
            await parentProfile.save();
            return res.json({"message": "This parent was added to your Friends List"});
        } else {
            return res.json({ "message": "This parent is not on your 'Want to be added' list" });
        }
    } catch (e) {
        console.log(e.message);
        return res.json({ "message": "Something went wrong" });
    }
}