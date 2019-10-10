const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Supplier = require("../../models/Supplier");

// @route   POST api/supplier
// @desc    Create supplier
// @access  Private
router.post(
    "/",
    [
        auth,
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("phone", "Please include a valid phone").isLength({
            min: 10,
            max: 15
        }),
        check("address", "Address is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email").isEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name, address, phone, isExists } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        if (member.role.name === "STAFF") {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let supplier = await Supplier.findOne({ name });
            if (supplier) {
                supplier.name = name;
                supplier.phone = phone;
                supplier.email = email;
                supplier.address = address;
                supplier.isExists = isExists;

                await supplier.save();
                return res.json(supplier);
            }
            supplier = new Supplier({
                email,
                name,
                phone,
                address
            });

            await supplier.save();
            return res.json(supplier);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/supplier
// @desc     Get all supplier
// @access   Private
router.get("/", auth, async (req, res) => {
    let account = await Account.findById(req.account.id);
    let member = await Member.findOne({ account });

    // Check if account is not member
    if (!member) {
        return res
            .status(401)
            .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
    }

    try {
        const supplies = await Supplier.find().sort({ date: -1 });
        res.json(supplies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route    DELETE api/supplier/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ msg: "Supplier not found" });
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
        supplier.isExists = false;
        await supplier.save();

        res.json({ msg: "Supplier removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            console.log("test");
            return res.status(404).json({ msg: "Supplier not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
