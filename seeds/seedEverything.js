const mongoose = require('mongoose');
const Son = require('../models/son');
const Parent = require('../models/parent');

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


(async() => {

    let sons = await Son.find({});
    let parents = await Parent.find({});

    for(let i = 0; i < sons.length; i++) {
        let s = sons[i];
        const min = 0;
        const max = 4;
        const parentsFriendsCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const parentsSavedCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const parentsWhoWantToBeAddedCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomParentsFriends = randomPeopleWithoutRepetition(parentsFriendsCount , ...parents);
        const randomParentsSaved = randomPeopleWithoutRepetition(parentsSavedCount , ...parents).map(r => r._id).map(r => r._id);
        const randomParentsWhoWantToBeAdded = randomPeopleWithoutRepetition(parentsWhoWantToBeAddedCount , ...parents).map(r => r._id);
        let parentsToBeAdded = {parentsFriends: randomParentsFriends, parentsSaved: randomParentsSaved, parentsWhoWantToBeAdded: randomParentsWhoWantToBeAdded};
        try {
            await Son.findByIdAndUpdate(s._id, {...parentsToBeAdded});
        } catch (e) {
            console.log(e);
        }
    }
    for(let i = 0; i < parents.length; i++) {
        let p = parents[i];
        const min = 0;
        const max = 4;
        const sonsFriendsCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const sonsSavedCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const sonsWhoWantToBeAddedCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomSonsFriends = randomPeopleWithoutRepetition(sonsFriendsCount , ...sons);
        const randomSonsSaved = randomPeopleWithoutRepetition(sonsSavedCount , ...sons).map(r => r._id).map(r => r._id);
        const randomSonsWhoWantToBeAdded = randomPeopleWithoutRepetition(sonsWhoWantToBeAddedCount , ...sons).map(r => r._id);
        let sonsToBeAdded = {sonsFriends: randomSonsFriends, sonsSaved: randomSonsSaved, sonsWhoWantToBeAdded: randomSonsWhoWantToBeAdded};
        try {
            await Parent.findByIdAndUpdate(p._id, {...sonsToBeAdded});
        } catch (e) {
            console.log(e);
        }
    }



    
    db.close();
})()

function randomPeopleWithoutRepetition(n, ...data) {
    let randomValues = [];
    for(let i = 0; i < n; i++) {
        const randomValue = data.splice(Math.floor(Math.random() * data.length), 1);
        randomValues.push(randomValue[0]);
    }
    return randomValues;
}