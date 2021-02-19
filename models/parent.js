const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const SocialMediaSchema = require('./socialMedia');
const passportLocalMongoose = require('passport-local-mongoose');

const DoughterSchema = new Schema({
    name: String,
    yearOfBirth: Number,
    socialMedia: [SocialMediaSchema]

})

const ParentSchema = new Schema({
    name: String,
    surname: String,
    job: String,
    hobbies: String,
    address: AddressSchema,
    doughters: [DoughterSchema],
    sonsFriends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Son'
        }
    ],
    sonsSaved: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Son'
        }
    ],
    sonsWhoWantToBeAdded: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Son'
        }
    ]
})

ParentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Parent', ParentSchema);