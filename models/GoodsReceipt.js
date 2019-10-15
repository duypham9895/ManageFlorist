let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GoodsReceiptSchema = new Schema({
    member: {
        type: Schema.Types.Mixed,
        ref: "member"
    },
    supplier: {
        type: Schema.Types.Mixed,
        ref: "supplier"
    },
    total: {
        type: Number,
        default: 0
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
module.exports = GoodsReceipt = mongoose.model(
    "goods_receipt",
    GoodsReceiptSchema
);
