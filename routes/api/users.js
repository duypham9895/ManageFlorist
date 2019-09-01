const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Customer = require("../../models/Customer");
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
            let account = await Account.findOne({ email });

            if (account) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Account already exists"
                        }
                    ]
                });
            }

            const avatar = gravatar.url(email, {
                s: 200,
                r: "pg",
                d: "mm"
            });

            account = new Account({
                name,
                email,
                password,
                phone,
                code,
                birthday,
                address
            });

            const salt = await bcrypt.genSalt(10);

            account.password = await bcrypt.hash(password, salt);

            delete account.password;

            await account.save();

            let role = await Role.findOne({ code });

            if (role) {
                if (role.qty <= 0) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "Your Code is Expired"
                            }
                        ]
                    });
                }

                let member = await Member.findOne({ account: account.id });
                // check if account member's exists
                if (member) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "Your Account already Exists"
                            }
                        ]
                    });
                }
                member = new Member({
                    account: account.id,
                    role: role.id
                });

                await member.save();
            } else {
                let customer = await Customer.findOne({ account: account.id });
                // check if account customer's exists
                if (customer) {
                    return res.status(400).json({
                        errors: [
                            {
                                msg: "Your Account already exists"
                            }
                        ]
                    });
                }

                customer = new Customer({
                    account: account.id
                });

                await customer.save();
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
