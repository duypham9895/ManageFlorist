const express = require("express");
const router = express.Router();

const ControllerUpload = require("../controllers/ControllerUpload");
const uploadMulter = require("../models/ModelMulter");

router.post(
    "/uploadProduct",
    uploadMulter.single("image"),
    ControllerUpload.uploadSingleFile
);

// module.exports = async function(app) {
//     app.route("/uploadProduct").post(
//         uploadMulter.single("image"),
//         // console.log("index js"),
//         // console.log(uploadMulter.single("image")),
//         ControllerUpload.uploadSingleFile
//     );
//     app.route("/uploadMultiple").post(
//         uploadMulter.any(),
//         ControllerUpload.uploadMultipleFiles
//     );
// };

module.exports = router;
