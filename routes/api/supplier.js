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
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, phone } = req.body;

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
            let supplier = await Supplier.findOne({ name, phone });
            if (supplier) {
                return res.status(400).json({
                    errors: [{ msg: "This Category already exists" }]
                });
            }

            supplier = new Supplier({
                name,
                phone,
                address
            });

            await supplier.save();

            res.json(supplier);
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
    let member = await Member.findOne({ account: account.id });

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

module.exports = router;
