const fs = require('fs');
const { string } = require('joi');
const mongoose = require('mongoose');
const parents = require('./parents');
const doughters = require('./doughters-parents');
const ParentProfile = require('../models/parentProfile');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/wielki-projekt', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

let cities = [];

cities = fs.readFileSync('cities.csv', 'utf-8', string);
cities = cities.split(/\r?\n/);
cities = cities.map(c => {
    return c.split(',');
});

let citiesJsonArray = [];
var headers = cities[0];
for (var i = 1; i < cities.length; i++) {
    var data = cities[i];
    var obj = {};
    for (var j = 0; j < cities[0].length; j++) {
        if (data[j]) {
            obj[headers[j].trim()] = data[j].trim();
        } else {
            obj[headers[j].trim()] = "";
        }
    }
    citiesJsonArray.push(obj);
};

let completeParents = parents.map(p => {
    let parentDoughters = doughters.filter(d => {
        return d.parent === p.email;
    })
    parentDoughters = parentDoughters.map(pD => {
        return ({name: pD.name, yearOfBirth: pD.yearOfBirth, socialMedia: pD.socialMedia})
    })
    let foundAddress = randomCity();
    return ({...p, doughters: parentDoughters, address: foundAddress});
})

// console.log(completeParents);

const seedDB = async () => {
    await ParentProfile.deleteMany({});
    await User.deleteMany({ role: 'parent' });
    for(let i = 0; i < completeParents.length; i++) {
        const user = new User({
            email: completeParents[i].email,
            name: completeParents[i].name,
            role: 'parent'
        })
        // console.log(user);
        const registeredUser = await User.register(user, completeParents[i].password)
        try {
            await registeredUser.save();
        } catch (e) {
            console.log(e);
        }
        const parentProfile = new ParentProfile({...completeParents[i], owner: registeredUser._id});
        try {
            await parentProfile.save();
        } catch (e) {
            console.log(e);
        }
    }
};

seedDB().then(() => {
    db.close();
})

function randomCity() {
    return citiesJsonArray[Math.floor(Math.random() * citiesJsonArray.length)];
}