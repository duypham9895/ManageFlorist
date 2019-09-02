let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    date_create: {
        type: Date,
        default: Date.now
    },
    isExists: {
        type: Boolean,
        default: true
    }
});
module.exports = Account = mongoose.model("account", AccountSchema);
