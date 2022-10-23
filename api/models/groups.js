const mongoose = require("mongoose");
const mongooseGuide = require('mongoose-guid')(mongoose);
const Schema = mongoose.Schema;

var GroupSchema = new Schema({
    id: { type: mongooseGuide.type, default: mongooseGuide.value },
    user: { type: mongooseGuide.type, required: true, },
    nomeGrupo: { type: String, required: true },
    adminUsers: { type: Array, },
    comunUsers: { type: Array, },
    ativo: { type: Boolean, default: true, required: true, },
},
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Groups', GroupSchema);