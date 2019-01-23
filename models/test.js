const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = Test = mongoose.model('Test', new Schema({
    value: { type: String, required: true }
}));