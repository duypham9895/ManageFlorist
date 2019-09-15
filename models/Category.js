let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    isExists: {
        type: Boolean,
        default: true
    }
});
module.exports = Category = mongoose.model("category", CategorySchema);
