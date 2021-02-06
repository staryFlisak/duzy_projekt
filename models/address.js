const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    city: String,
    country: String
})

module.exports = AddressSchema;