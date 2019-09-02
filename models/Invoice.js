let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InvoiceSchema = new Schema({
    employee: {
        type: Schema.Types.Mixed,
        ref: "member"
    },
    customer: {
        type: Schema.Types.Mixed,
        ref: "customer"
    },
    total: {
        type: Number,
        required: true
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
