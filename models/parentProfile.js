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
    job: String,
    hobbies: [String],
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

module.exports = mongoose.model('ParentProfile', ParentSchema);