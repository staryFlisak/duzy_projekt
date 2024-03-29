const mongoose = require('mongoose');
const SonProfile = require('../models/sonProfile');
const ParentProfile = require('../models/parentProfile');
const {Chat} = require('../models/chat');

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

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consequat nisl a mi hendrerit laoreet. Fusce tristique eu est nec dignissim. Etiam nec vulputate massa. Ut sed sapien ut nisi tempor tincidunt eu et velit. Sed mi neque, tristique a dolor a, maximus euismod lorem. Morbi viverra est augue, at sagittis urna lacinia non. Pellentesque id tellus in enim auctor finibus. Maecenas quis dolor sit amet nisi gravida tristique at et ligula. Integer venenatis tincidunt tellus ut vestibulum';

(async () => {

    let sons = await SonProfile.find({});
    let parents = await ParentProfile.find({});

    for(let i = 0; i < sons.length; i++) {
        let s = sons[i];
        const min = 0;
        const max = 4;
        const parentsFriendsCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const parentsSavedCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const parentsWhoWantToBeAddedCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const parentsWithRequestSentCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomParentsFriends = randomPeopleWithoutRepetition(parentsFriendsCount, ...parents).map(r => r._id).map(r => r._id);;
        const randomParentsSaved = randomPeopleWithoutRepetition(parentsSavedCount, ...parents).map(r => r._id).map(r => r._id);
        const randomParentsWhoWantToBeAdded = randomPeopleWithoutRepetition(parentsWhoWantToBeAddedCount, ...parents).map(r => r._id);
        const randomParentsWithRequestSent = randomPeopleWithoutRepetition(parentsWithRequestSentCount, ...parents).map(r => r._id);
        let parentsToBeAdded = {
            parentsFriends: {dateWhenLastParentAdded: Date.now(), parentsFriendsArray: randomParentsFriends},
            parentsSaved: randomParentsSaved,
            parentsWhoWantToBeAdded: randomParentsWhoWantToBeAdded,
            parentsWithRequestSent: {dateWhenLastRequestWasSent: Date.now(), parentsWithRequestSentArray: randomParentsWithRequestSent}
        };
        try {
            // console.log(parentsToBeAdded.parentsFriends);
            await SonProfile.findByIdAndUpdate(s._id, {...parentsToBeAdded});
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
        const sonsWithRequestSentCount = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomSonsFriends = randomPeopleWithoutRepetition(sonsFriendsCount, ...sons).map(r => r._id).map(r => r._id);;
        const randomSonsSaved = randomPeopleWithoutRepetition(sonsSavedCount, ...sons).map(r => r._id).map(r => r._id);
        const randomSonsWhoWantToBeAdded = randomPeopleWithoutRepetition(sonsWhoWantToBeAddedCount, ...sons).map(r => r._id);
        const randomSonsWithRequestSent = randomPeopleWithoutRepetition(sonsWithRequestSentCount, ...sons).map(r => r._id);
        let sonsToBeAdded = {
            sonsFriends: {dateWhenLastSonAdded: Date.now(), sonsFriendsArray: randomSonsFriends},
            sonsSaved: randomSonsSaved,
            sonsWhoWantToBeAdded: randomSonsWhoWantToBeAdded,
            sonsWithRequestSent: {dateWhenLastRequestWasSent: Date.now(), sonsWithRequestSentArray: randomSonsWithRequestSent}
        };
        try {
            await ParentProfile.findByIdAndUpdate(p._id, {...sonsToBeAdded});
        } catch (e) {
            console.log(e);
        }
    }

    await Chat.deleteMany({});
    sons = await SonProfile.find({});
    for (let i = 0; i < sons.length; i++) {
        let son = sons[i];
        const parentsFriends = son.parentsFriends.parentsFriendsArray;
        for (let j = 0; j < parentsFriends.length; j++) {
            const chat = new Chat({ chattingParent: parentsFriends[j], chattingSon: son._id });
            try {
                await chat.save();
            } catch (e) {
                console.log(e);
            }
            const messageCount = Math.floor(Math.random() * (101));
            const startDate = new Date('2022-02-28');
            for (k = 0; k < messageCount; k++) {
                const messageLength = Math.floor(Math.random() * (480));
                const messageText = lorem.slice(0, messageLength);
                let sender = '';
                const isSenderParent = Math.random() < 0.5 ? true : false;
                if (isSenderParent) {
                    try {
                        const foundParent = await ParentProfile.findById(parentsFriends[j]).populate({
                            path: 'owner',
                            select: '_id'
                        });
                        sender = foundParent.owner._id;
                    } catch (e) {
                        console.log(e);
                    }
                    
                } else {
                    try {
                        const foundSon = await SonProfile.findById(son._id).populate({
                            path: 'owner',
                            select: '_id'
                        });
                        sender = foundSon.owner._id;
                    } catch (e) {
                        console.log(e);
                    }
                    
                }
                const messageDate = startDate.setDate(startDate.getDate() + 1);
                const fullMessage = { text: messageText, sender, date: messageDate };
                chat.messages.push(fullMessage);
                await chat.save();
            }
        }
    }
    db.close();
})()

function randomPeopleWithoutRepetition(n, ...data) {
    let randomValues = [];
    for (let i = 0; i < n; i++) {
        const randomValue = data.splice(Math.floor(Math.random() * data.length), 1);
        randomValues.push(randomValue[0]);
    }
    return randomValues;
}