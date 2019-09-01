const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/Member");
const Role = require("../../models/Role");

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
        check(
            "password",
            "Please enter a password with 6 characters or more"
        ).isLength({ min: 6 }),
        check("phone", "Please include a valid phone").isLength({
            min: 10,
            max: 15
        }),
        check("code", "Code is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, address, phone, code } = req.body;
        try {
            let user = await User.findOne({ email });
            let role = await Role.findOne({ code });

            if (user || !role) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "User already exists or Your code is invalid"
                        }
                    ]
                });
            }

            const avatar = gravatar.url(email, {
                s: 200,
                r: "pg",
                d: "mm"
            });

            user = new User({
                name,
                email,
                password,
                address,
                phone,
                role
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            delete user.password;

            role.qty -= 1;

            await role.save();
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
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
