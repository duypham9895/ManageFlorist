let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DiscountSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});
module.exports = Discount = mongoose.model("discount", DiscountSchema);
