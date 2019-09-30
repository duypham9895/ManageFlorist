const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");

// Service
const accountService = require("../service/account");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    "/",
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("phone", "Please include a valid phone").isLength({
            min: 10,
            max: 15
        }),
        check("password")
            .isLength({ min: 6 })
            .withMessage("Password must contain at least 6 characters")
            .isLength({
                max: 20
            })
            .withMessage("Password can contain max 20 characters"),
        check("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation is incorrect");
            }

            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            email,
            password,
            phone,
            code,
            birthday,
            address
        } = req.body;
        try {
            let findEmail = await Account.findOne({ email: email });
            let findPhone = await Account.findOne({ phone: phone });

            if (findEmail) {
                return res.status(400).json({
                    errors: [
                        {
                            param: "email",
                            msg: "Your email was existed"
                        }
                    ]
                });
            }

            if (findPhone) {
                return res.status(400).json({
                    errors: [
                        {
                            param: "phone",
                            msg: "Your phone was existed"
                        }
                    ]
                });
            }

            let user = {
                name,
                email,
                password,
                phone,
                code,
                birthday,
                address
            };
            // await accountService.create(user);
            let account = await accountService.create(user);
            return res.status(200).json();

            // const payload = {
            //     account: {
            //         id: account.id
            //     }
            // };

            // jwt.sign(
            //     payload,
            //     config.get("jwtSecret"),
            //     { expiresIn: 360000 },
            //     async (err, token) => {
            //         if (err) throw err;
            //         account.token = token;
            //         await account.save();

            //         return res.status(200).json(token);
            //     }
            // );
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
