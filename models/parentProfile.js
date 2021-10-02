const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('./address');
const SocialMediaSchema = require('./socialMedia');

const DoughterSchema = new Schema({
    socialMedia: [SocialMediaSchema]
})

const ParentSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    job: { type: String, default: "" },
    hobbies: { type: [String], default: [] },
    address: {type: AddressSchema, default: {} },
    sonAgeMin: {type: Number, min: 18, max: 94, default: 18},
    sonAgeMax: {type: Number, min: 23, max: 99, default: 99},
    doughters: {type: [DoughterSchema], deafult: []},
    sonsFriends: {type: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Son'
        },
    ], default: [] },
    sonsSaved: { type: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Son'
        }
    ], default: []},
    sonsWhoWantToBeAdded: {type: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Son'
        }
    ], default: []}
})

module.exports = mongoose.model('ParentProfile', ParentSchema);