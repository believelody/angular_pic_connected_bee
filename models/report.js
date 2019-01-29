const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Report', new Schema({
    by: {type: Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, required: true},
    title: {type: String, required: true}
}, {timestamps: true}));