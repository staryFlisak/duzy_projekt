const path = require('path');
const User = require('../models/user');
const SonProfile = require('../models/sonProfile');
const ParentProfile = require('../models/parentProfile');

module.exports.renderLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
}

module.exports.login = (req, res) => {
    res.json({ "message": 'Logowanie powiodło się', "userId": req.user._id });
}

module.exports.logout = (req, res) => {
    req.logout();
    res.send("Użytkownik wylogowany");
}

module.exports.deleteUser = async (req, res) => {
    const foundSonProfiles = await SonProfile.find().populate({
        path: 'owner',
        select: '_id'
    }).exec();
    const foundSonProfile = foundSonProfiles.find(fSP => fSP.owner._id.equals(req.user._id));
    const foundParentProfiles = await ParentProfile.find().populate({
        path: 'owner',
        select: '_id'
    }).exec();
    const foundParentProfile = foundParentProfiles.find(fPP => fPP.owner._id.equals(req.user._id));
    if(foundSonProfile) {
        try {
            await SonProfile.findByIdAndDelete(foundSonProfile._id);
            await User.findByIdAndDelete(req.params.id);
            return res.send('Uzytkownik usunięty');
        } catch(e) {
            return res.send('Mamy jakieś problemy');
        }
    }
    if(foundParentProfile) {
        try {
            await ParentProfile.findByIdAndDelete(foundParentProfile._id);
            await User.findByIdAndDelete(req.params.id);
            return res.send('Uzytkownik usunięty');
        } catch(e) {
            return res.send('Mamy jakieś problemy');
        }
    }
}