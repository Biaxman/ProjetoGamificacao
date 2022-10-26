const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var taskGroupSchema = new Schema({
    idGroup: mongoose.ObjectId,
    idTasks: { type: Array, },
    ativo: { type: Boolean, default: true, required: true, },
},
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('TaskGroup', taskGroupSchema);