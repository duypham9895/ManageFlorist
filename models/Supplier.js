let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SupplierSchema = new Schema({
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
    email: {
        type: String,
        required: true
    },
    isExists: {
        type: Boolean,
        default: true
    },
    date_create: {
        type: Date,
        default: Date.now
    }
});

module.exports = Supplier = mongoose.model("supplier", SupplierSchema);
