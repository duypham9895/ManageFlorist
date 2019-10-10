let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {
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
module.exports = Category = mongoose.model("category", CategorySchema);
