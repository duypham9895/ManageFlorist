let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "account"
    },
    salary: {
        type: Number
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "role"
    }
});

module.exports = User = mongoose.model("user", UserSchema);
