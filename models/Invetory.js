let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let InventorySchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    qty: {
        type: Number,
        required: true
    },
    expiration_date: {
        type: Date
    },
    receipt_date: {
        type: Date,
        default: Date.now
    },
    isDamage: {
        type: Boolean
    }
});
module.exports = Inventory = mongoose.model("inventory", InventorySchema);
