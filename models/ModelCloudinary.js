var cloudinary = require("cloudinary").v2;
//lấy trong https://cloudinary.com/console/welcome
cloudinary.config({
    cloud_name: "duypham9895",
    api_key: "989696418619117",
    api_secret: "lKX4W2efrvTAZd2rJjeFuV6A2xA"
});

var self = (module.exports = {
    uploadProduct: file => {
        return new Promise(resolve => {
            cloudinary.uploader
                .upload(file, {
                    folder: "ManageFlorist/Flower"
                })
                .then(result => {
                    if (result) {
                        const fs = require("fs");
                        fs.unlinkSync(file);
                        resolve({
                            url: result.secure_url
                        });
                    }
                });
        });
    },
    // uploadProduct: file => {
    //     return new Promise(resolve => {
    //         cloudinary.uploader
    //             .upload(file, {
    //                 folder: "product"
    //             })
    //             .then(result => {
    //                 if (result) {
    //                     const fs = require("fs");
    //                     fs.unlinkSync(file);
    //                     resolve({
    //                         url: result.secure_url
    //                     });
    //                 }
    //             });
    //     });
    // },
    uploadMultiple: file => {
        return new Promise(resolve => {
            cloudinary.uploader
                .upload(file, {
                    folder: "home"
                })
                .then(result => {
                    if (result) {
                        const fs = require("fs");
                        fs.unlinkSync(file);
                        resolve({
                            url: result.secure_url,
                            id: result.public_id,
                            thumb1: self.reSizeImage(
                                result.public_id,
                                200,
                                200
                            ),
                            main: self.reSizeImage(result.public_id, 500, 500),
                            thumb2: self.reSizeImage(result.public_id, 300, 300)
                        });
                    }
                });
        });
    },
    reSizeImage: (id, h, w) => {
        return cloudinary.url(id, {
            height: h,
            width: w,
            crop: "scale",
            format: "jpg"
        });
    }
});
