let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RoleSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Role = mongoose.model("role", RoleSchema);
