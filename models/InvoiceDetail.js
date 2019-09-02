let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InvoiceDetailSchema = new Schema({
    invoice: {
        type: Schema.Types.Mixed,
        ref: "invoice"
    },
    product: {
        type: Schema.Types.Mixed,
        ref: "product"
    },
    qty: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
module.exports = InvoiceDetail = mongoose.model(
    "invoice_detail",
    InvoiceDetailSchema
);
