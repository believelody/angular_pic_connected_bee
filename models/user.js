const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    poste: { type: String, required: true },
    deleted: {type: Boolean, default: false}
})

module.exports = mongoose.model('User', user);