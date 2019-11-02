const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Models
const Account = require("../../models/Account");
const Member = require("../../models/Member");
const GoodsReceipt = require("../../models/GoodsReceipt");
const GoodsReceiptDetail = require("../../models/GoodsReceiptDetail");

// @route   GET api/receipt
// @desc    GET all receipt
// @access  Private
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
        const receipts = await GoodsReceiptDetail.find().sort({ date: -1 });

        return res.json(receipts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route   GET api/receipt/:id
// @desc    GET all receipt detail
// @access  Private
router.get("/:id", auth, async (req, res) => {
    let account = await Account.findById(req.account.id);
    let member = await Member.findOne({ account });

    // Check if account is not member
    if (!member) {
        return res
            .status(401)
            .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
    }

    try {
        const receipt = await GoodsReceiptDetail.findById(req.params.id);

        if (!receipt) {
            return res.status(404).json({ msg: "Receipt not found" });
        }

        return res.json(receipt);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
