let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SupplierSchema = new Schema({
    // name, address, phone
    _id: String,
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isExists: {
        type: Boolean,
        default: true
    }
});

module.exports = Supplier = mongoose.model("supplier", SupplierSchema);
