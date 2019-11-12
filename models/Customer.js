let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CustomerSchema = new Schema({
    account: {
        type: Schema.Types.Mixed,
        ref: "account"
    },
    point: {
        type: Number,
        default: 0
    },
    level: {
        type: String,
        default: "NEW"
    }
});
module.exports = Customer = mongoose.model("customer", CustomerSchema);
