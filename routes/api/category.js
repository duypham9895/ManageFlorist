const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Category = require("../../models/Category");

// @route   POST api/category
// @desc    Create category
// @access  Private
router.post(
    "/",
    [
        auth,
        check("name", "Name is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account: account.id });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        let findRole = await Role.findById(member.role);

        if (findRole.name === "STAFF") {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let category = await Category.findOne({ name });

            if (category) {
                return res.status(400).json({
                    errors: [{ msg: "This Category already exists" }]
                });
            }

            category = new Category({
                name
            });

            await category.save();

            res.json(category);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/category
// @desc     Get all category
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
        const categories = await Category.find().sort({ date: -1 });
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
