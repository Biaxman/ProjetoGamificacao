const mongoose = require("mongoose");
const mongooseGuide = require('mongoose-guid')(mongoose);
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: { type: mongooseGuide.type, default: mongooseGuide.value },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true },
    ativo: { type: Boolean, default: true, required: true },
    dataInclusao: { type: Date, required: true },
    dataExclusao: { type: Date }
});

module.exports = mongoose.model('User',UserSchema);

