const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measure = new Schema({
    ruche: {type: Schema.Types.ObjectId, ref: 'Ruche'},
    poids: {type: Number, required: true},
    tInt: {type: Number, required: true},
    tExt: {type: Number, required: true},
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = Measure = mongoose.model('Mesure', measure);