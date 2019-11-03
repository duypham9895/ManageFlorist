const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Discount = require("../../models/Discount");

// @route   POST api/discount
// @desc    Create discount
// @access  Private
router.post(
    "/",
    [
        auth,
        check("code", "Code is required")
            .not()
            .isEmpty(),
        check("event", "Event is required")
            .not()
            .isEmpty(),
        check("percent", "Percent is required")
            .not()
            .isEmpty(),
        check("startDate", "Start Date is required")
            .not()
            .isEmpty(),
        check("endDate", "End Date is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { code, percent, event, startDate, endDate, isExists } = req.body;

        try {
            let account = await Account.findById(req.account.id);
            let member = await Member.findOne({ account: account });
            // Check if account is not member
            if (!member) {
                return res.status(401).json({
                    errors: [{ msg: "Your Account is Unauthorized" }]
                });
            }

            let findRole = await Role.findById(member.role);

            if (findRole.name !== "ADMIN") {
                return res.status(401).json({
                    errors: [{ msg: "Your Account is Unauthorized" }]
                });
            }
            let discount = await Discount.findOne({ code });
            if (discount) {
                discount.event = event;
                discount.percent = percent;
                discount.startDate = startDate;
                discount.endDate = endDate;
                discount.isExists = isExists;

                await discount.save();

                return res.json(discount);
            }
            discount = new Discount({
                code,
                event,
                percent,
                startDate,
                endDate
            });

            await discount.save();

            res.json(discount);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/discount
// @desc     Get all discount
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
        const discounts = await Discount.find().sort({ date: -1 });
        res.json(discounts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route    DELETE api/discount/:id
// @desc     Delete a post
// @access   Private
router.delete("/:id", auth, async (req, res) => {
    try {
        let discount = await Discount.findById(req.params.id);

        if (!discount) {
            return res.status(404).json({ msg: "Discount not found" });
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
        discount.isExists = false;
        await discount.save();

        res.json({ msg: "Discount removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            console.log("test");
            return res.status(404).json({ msg: "Discount not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
