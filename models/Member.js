let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MemberSchema = new Schema({
    account: {
        type: Schema.Types.Mixed,
        ref: "account"
    },
    salary: {
        type: Number
    },
    role: {
        type: Schema.Types.Mixed,
        ref: "role"
    }
});

module.exports = Member = mongoose.model("Member", MemberSchema);
