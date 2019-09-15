let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DiscountSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    percent: {
        type: Number,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});
module.exports = Discount = mongoose.model("discount", DiscountSchema);
