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

        const { name, isExists } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        // Check if account is not ADMIN & MANAGER
        if (member.role.name === "STAFF") {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let category = await Category.findOne({ name });

            if (category) {
                category.name = name;
                category.isExists = isExists;

                await category.save();
                return res.json(category);
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
    let member = await Member.findOne({ account });

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

// @route    DELETE api/category/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
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
        category.isExists = false;
        await category.save();

        res.json({ msg: "Category removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            console.log("test");
            return res.status(404).json({ msg: "Category not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
