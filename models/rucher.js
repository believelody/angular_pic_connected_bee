const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Rucher', new Schema({
    numero: {type: Number, required: true},
    coords: {
        lat: Number,
        lng: Number
    },
    ruches: [{type: Schema.Types.ObjectId, ref: 'Ruche'}],
    deleted: { type: Boolean, default: false }
}, {timestamps: true}));