const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const SocialMediaSchema = require('./socialMedia');
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const SonSchema = new Schema({
    email: String,
    name: String,
    surname: String,
    dateOfBirth: Date,
    address: AddressSchema,
    aboutYou: String,
    images: [ImageSchema],
    job: {
        position: String,
        location: AddressSchema,
        companyName: String
    },
    education: {
        schoolName: String,
        educationLevel: String,
        field: String
    },
    organizations: [
        {
            name: String,
            location: AddressSchema,
            dateFrom: String,
            dateTo: String
        }
    ],
    hobbies: [String],
    socialMedia: [SocialMediaSchema],
    parentsFriends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Parent'
        }
    ],
    parentsSaved: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Parent'
        }
    ],
    parentsWhoWantToBeAdded: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Parent'
        }
    ]
})

SonSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('Son', SonSchema);