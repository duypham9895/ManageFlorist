const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
    try {
        const account = await Account.findById(req.account.id).select(
            "-password"
        );
        res.json(account);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/auth
// @desc    Authenticate account & get token
// @access  Public
router.post(
    "/",
    [
        check("username", "Please include a valid username")
            .not()
            .isEmpty(),
        check("password", "Password is required ").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        try {
            let findEmail = await Account.findOne({ email: username });
            let findPhone = await Account.findOne({ phone: username });

            if (!findEmail && !findPhone) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials ep" }] });
            }

            let account;

            if (findEmail) account = findEmail;
            if (findPhone) account = findPhone;

            const isMatch = await bcrypt.compare(password, account.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials m" }] });
            }

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
