const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Role = require("../../models/Role");

// @route   POST api/role
// @desc    Create role
// @access  Private
router.post(
    "/",
    [
        auth,
        check("name", "Name of Role is required")
            .not()
            .isEmpty(),
        check("code", "Please include a valid code").isLength({
            min: 10,
            max: 15
        }),
        check("qty", "Qty is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { code, qty, name, isExists } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account: account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        let findRole = await Role.findById(member.role);

        if (findRole.name !== "ADMIN") {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let role = await Role.findOne({ code });

            if (role) {
                role.code = code;
                role.name = name;
                role.isExists = isExists;
                role.qty = qty;

                await role.save();
                return res.json(role);
            }

            role = new Role({
                name,
                code,
                qty
            });

            await role.save();

            res.json(role);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/role
// @desc     Get all role
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
        const roles = await Role.find().sort({ date: -1 });
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route    DELETE api/role/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ msg: "Role not found" });
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
        role.isExists = false;
        await role.save();

        res.json({ msg: "Role removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Role not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
