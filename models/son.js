const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const SocialMediaSchema = require('./socialMedia');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

const SonSchema = new Schema({
    name: String,
    surname: String,
    dateOfBirth: String,
    address: AddressSchema,
    aboutYou: String,
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
    hobbies: String,
    socialMedia: [SocialMediaSchema]
})

module.exports = mongoose.model('Son', SonSchema);