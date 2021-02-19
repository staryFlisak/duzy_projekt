module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    res.send('Logowanie powiodło się');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Do widzenia");
    res.send("Użytkownik wylogowany");
}