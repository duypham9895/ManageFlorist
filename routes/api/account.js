const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");

// @route   POST api/account
// @desc    Register account
// @access  Public
router.post(
    "/",
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 characters or more"
        ).isLength({ min: 6 }),
        check("address", "Address is required")
            .not()
            .isEmpty(),
        check("phone", "Please include a valid phone").isLength({
            min: 10,
            max: 15
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, address, phone } = req.body;
        try {
            let user = await Account.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            const avatar = gravatar.url(email, {
                s: 200,
                r: "pg",
                d: "mm"
            });

            user = new Account({
                name,
                email,
                password,
                address,
                phone
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            delete user.password;

            await user.save();

            const payload = {
                account: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
