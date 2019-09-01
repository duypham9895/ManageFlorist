let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InvoiceSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "member"
    },
    customer: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: "discount"
    }
});
module.exports = Invoice = mongoose.model("invoice", InvoiceSchema);
