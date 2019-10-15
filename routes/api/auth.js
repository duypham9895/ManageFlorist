const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Customer = require("../../models/Customer");

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
        check("password", "Password is required ")
            .not()
            .isEmpty()
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
                return res.status(404).json({
                    errors: [{ msg: "Your account does not exist." }]
                });
            }

            let account, member, customer;

            if (findEmail) account = findEmail;
            if (findPhone) account = findPhone;

            const isMatch = await bcrypt.compare(password, account.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Your username or password incorrect" }]
                });
            }
            member = await Member.findOne({ "account.email": account.email });
            customer = await Customer.findOne({
                "account.email": account.email
            });

            const payload = {
                account: {
                    id: account.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                async (err, token) => {
                    if (err) throw err;

                    account.token = token;

                    if (member) {
                        member.account = account;
                        await member.save();
                    }
                    if (customer) {
                        customer.account = account;
                        await customer.save();
                    }

                    await account.save();

                    return res.status(200).json(token);
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route   PUT api/auth
// @desc    Check session
// @access  Public
router.put("/", async (req, res) => {
    if (!req.body.token) {
        return res.status(400).json({ msg: "Session token not found." });
    }

    jwt.verify(req.body.token, config.get("jwtSecret"), async (err, token) => {
        if (!err) {
            let id = token.account.id;
            let account = await Account.findOne({ _id: id });

            if (!account) {
                return res.sendStatus(400);
            }

            if (req.body.token !== account.token) {
                return res.sendStatus(400);
            }
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    });
});

module.exports = router;
