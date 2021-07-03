const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const SocialMediaSchema = require('./socialMedia');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const SonProfileSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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
            ref: 'ParentProfile'
        }
    ],
    parentsSaved: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ParentProfile'
        }
    ],
    parentsWhoWantToBeAdded: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ParentProfile'
        }
    ]
})

module.exports = mongoose.model('SonProfile', SonProfileSchema);