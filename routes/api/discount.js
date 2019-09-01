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

        const { code, event, startDate, endDate } = req.body;

        try {
            let account = await Account.findById(req.account.id);
            let member = await Member.findOne({ account: account.id });

            // Check if account is not member
            if (!member) {
                return res
                    .status(401)
                    .json({
                        errors: [{ msg: "Your Account is Unauthorized" }]
                    });
            }

            let findRole = await Role.findById(member.role);

            if (findRole.name !== "ADMIN") {
                return res
                    .status(401)
                    .json({
                        errors: [{ msg: "Your Account is Unauthorized" }]
                    });
            }
            let discount = await Discount.findOne({ code });

            if (discount) {
                return res.status(400).json({
                    errors: [{ msg: "This Code to Discount already exists" }]
                });
            }

            discount = new Discount({
                code,
                event,
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

module.exports = router;
