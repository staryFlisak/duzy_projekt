const path = require('path');

module.exports.renderLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
}

module.exports.login = (req, res) => {
    res.send('Logowanie powiodło się');
}

module.exports.logout = (req, res) => {
    req.logout();
    res.send("Użytkownik wylogowany");
}