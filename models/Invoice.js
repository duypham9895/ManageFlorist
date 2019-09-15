let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InvoiceSchema = new Schema({
    member: {
        type: Schema.Types.Mixed,
        ref: "member"
    },
    customer: {
        type: Schema.Types.Mixed,
        ref: "customer"
    },
    total: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    discount: {
        type: Schema.Types.Mixed,
        ref: "discount"
    }
});
module.exports = Invoice = mongoose.model("invoice", InvoiceSchema);
