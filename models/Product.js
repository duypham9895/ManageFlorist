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
                type: String,
                required: true
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
    isExists: {
        type: Boolean,
        default: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
module.exports = Product = mongoose.model("product", ProductSchema);
