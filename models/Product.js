let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: [
        {
            image: {
                type: String
            }
        }
    ],
    import_price: {
        type: Number,
        required: true
    },
    selling_price: {
        type: Number,
        required: true
    },
    expired: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "supplier"
    }
});
module.exports = Product = mongoose.model("product", ProductSchema);
