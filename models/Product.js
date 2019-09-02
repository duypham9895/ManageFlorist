let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    importPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    expired: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.Mixed,
        ref: "category"
    },
    supplier: {
        type: Schema.Types.Mixed,
        ref: "supplier"
    },
    isExists: {
        type: Boolean,
        default: true
    }
});
module.exports = Product = mongoose.model("product", ProductSchema);
