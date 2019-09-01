let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
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
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    salary: {
        type: Number
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "account"
    },
    date_create: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("user", UserSchema);
