let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InventorySchema = new Schema({
    product: {
        type: Schema.Types.Mixed,
        ref: "product"
    },
    qty: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date
    },
    receiptDate: {
        type: Date,
        default: Date.now
    },
    isDamage: {
        type: Boolean,
        default: false
    }
});
module.exports = Inventory = mongoose.model("inventory", InventorySchema);
