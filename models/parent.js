const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const SocialMediaSchema = require('./socialMedia');

const DoughterSchema = new Schema({
    name: String,
    yearOfBirth: Number,
    socialMedia: [SocialMediaSchema]

})

const FatherSchema = new Schema({
    name: String,
    surname: String,
    job: String,
    hobbies: String,
    address: AddressSchema,
    doughters: [DoughterSchema]
})