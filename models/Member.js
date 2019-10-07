let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MemberSchema = new Schema({
    account: Schema.Types.Mixed,
    // account: {
    //     type: Schema.Types.Mixed,
    //     ref: "account"
    // },
    salary: {
        type: Number
    },
    role: Schema.Types.Mixed
    // role: {
    //     type: Schema.Types.Mixed,
    //     ref: "role"
    // }
});

module.exports = Member = mongoose.model("member", MemberSchema);
