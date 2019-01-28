const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Ruche', new Schema({
    numero: { type: Number, required: true },
    rucher: {type: Schema.Types.ObjectId, ref: 'Rucher'},
    mesures: [{ type: Schema.Types.ObjectId, ref: 'Mesure' }],
    deleted: { type: Boolean, default: false }
}, { timestamps: true }));