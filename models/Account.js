let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default:
            "https://res.cloudinary.com/duypham9895/image/upload/v1570775911/images_hipxps.png"
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    isExists: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    }
});
module.exports = Account = mongoose.model("account", AccountSchema);
