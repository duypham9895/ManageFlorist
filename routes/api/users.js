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
        // check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 characters or more"
        ).isLength({ min: 6 })
        // check("phone", "Please include a valid phone").isLength({
        //     min: 10,
        //     max: 15
        // })
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
            let user = {
                name,
                email,
                password,
                phone,
                code,
                birthday,
                address
            };

            let account = accountService.create(user);

            const payload = {
                account: {
                    id: account.id
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
