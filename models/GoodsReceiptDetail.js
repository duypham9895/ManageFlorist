let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let GoodsReceiptDetailSchema = new Schema({
    goodsReceipt: {
        type: Schema.Types.Mixed,
        ref: "goods_receipt"
    },
    product: {
        type: Schema.Types.Mixed,
        ref: "product"
    },
    unitPrice: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
module.exports = GoodsReceiptDetail = mongoose.model(
    "goods_receipt_detail",
    GoodsReceiptDetailSchema
);
