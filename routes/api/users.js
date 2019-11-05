const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Customer = require("../../models/Customer");
const Invoice = require("../../models/Invoice");
const Role = require("../../models/Role");

// Service
const accountService = require("../service/account");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    "/",
    [
        // auth,
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
            let account = await accountService.create(user);

            return res.status(200).json(account);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route   PUT api/users
// @desc    Update information user
// @access  Private
router.put("/:id", auth, async (req, res) => {
    const {
        name,
        password,
        confirmPassword,
        code,
        birthday,
        address,
        isExists,
        salary,
        target
    } = req.body;

    let user = await Account.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }
    let userMember = await Member.findOne({ account: user });
    let userCustomer = await Customer.findOne({ account: user });
    // console.log(user);
    // Check ADMIN
    let account = await Account.findById(req.account.id);
    let member = await Member.findOne({ account });
    let customer = await Customer.findOne({ account });

    let role;
    if (code !== "") {
        role = await Role.findOne({ code });

        if (role.name !== userMember.role.name) {
            if (role.qty <= 0) {
                return res.status(400).json({
                    errors: [
                        {
                            param: "code",
                            msg: "Your Code is Expired"
                        }
                    ]
                });
            }
            userMember.role = role;
            role.qty -= 1;
            await role.save();
        } else {
        }
    }
    if (member.role.name === "ADMIN") {
        user.isExists = isExists;
        user.name = name;
        user.address = address;
        user.birthday = birthday;
        if (password !== confirmPassword) {
            return res.status(400).json({
                errors: [
                    {
                        param: "confirmPassword",
                        msg: "Password must match"
                    }
                ]
            });
        } else if (password !== undefined || confirmPassword !== undefined) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            delete password;
            delete confirmPassword;
        }
        await user.save();

        userMember.salary = salary;
        userMember.target = target;
        userMember.account = user;
        await userMember.save();
        return res.json(userMember);
    }
    if (member.role.name !== "ADMIN" || customer) {
        user.name = name;
        user.address = address;
        user.birthday = birthday;

        if (password !== confirmPassword) {
            password = "";
            confirmPassword = "";
            return res.status(400).json({
                errors: [
                    {
                        param: "confirmPassword",
                        msg: "Password must match"
                    }
                ]
            });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        delete password;
        delete confirmPassword;
        await user.save();

        if (userMember) {
            userMember.account = user;
            await userMember.save();
            return res.json("Update success");
        }

        if (userCustomer) {
            userCustomer.account = user;
            await userCustomer.save();
            return res.json("Update success");
        }
    }
});

// @route   GET api/users/logout
// @desc    Logout user
// @access  Private
router.get("/logout", auth, async (req, res) => {
    try {
        let account = await Account.findById(req.account.id);
        if (account) {
            account.token = "";

            let customer = await Customer.findOne({ account });
            let member = await Member.findOne({ account });

            if (customer) {
                customer.account = account;
                let invoice = await Invoice.findOne({ customer });
                if (invoice) {
                    invoice.customer = customer;
                    await invoice.save();
                }
                await customer.save();
            }

            if (member) {
                member.account = account;
                let invoice = await Invoice.findOne({ member });
                if (invoice) {
                    invoice.member = member;
                    await invoice.save();
                }
                await member.save();
            }

            await account.save();
            return res.sendStatus(200);
        }

        return res.sendStatus(404);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route    GET api/users/member
// @desc     Get all member
// @access   Private
router.get("/member", auth, async (req, res) => {
    let account = await Account.findById(req.account.id);
    let member = await Member.findOne({ account });
    // Check if account is not member
    if (member.role.name !== "ADMIN") {
        return res
            .status(401)
            .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
    }

    try {
        const users = await Member.find()
            .select("-password")
            .sort({ date: -1 });

        for (let i = 0; i < users.length; i++) {
            if (users[i].account.token === account.token) {
                users.splice(users.indexOf(users[i]), 1);
            }
        }

        for (let i = 0; i < users.length; i++) {
            delete users[i].account.password;
        }

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route    DELETE api/users/member/:id
// @desc     Delete a member
// @access   Private
router.delete("/member/:id", auth, async (req, res) => {
    try {
        let user = await Account.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check ADMIN
        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        if (member.role.name !== "ADMIN") {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }
        member = await Member.findOne({ account: user });

        user.isExists = false;
        await user.save();

        member.account = user;
        await member.save();

        res.json({ msg: "Account removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Supplier not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
