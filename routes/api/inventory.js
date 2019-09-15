const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Inventory = require("../../models/Inventory");
const Product = require("../../models/Product");

// @route   POST api/inventory
// @desc    Create stock
// @access  Private
router.post(
    "/",
    [
        auth,
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("qty", "Expired is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, qty } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        let product = await Product.findOne({ name });

        if (!product) {
            return res.status(400).json({
                errors: [
                    {
                        msg:
                            "Please add this product before adding it to the Inventory"
                    }
                ]
            });
        } else if (product.isExists === false) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "This product does not exist. Please check again"
                    }
                ]
            });
        }

        try {
            let expirationDate = new Date();
            expirationDate.setDate(
                expirationDate.getDate() + Number(product.expired)
            );

            let inventory = new Inventory({
                product: product,
                qty: qty,
                expirationDate: expirationDate
            });

            await inventory.save();

            res.json({ inventory });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/inventory
// @desc     Get all inventory products
// @access   Private
router.get("/", auth, async (req, res) => {
    try {
        const inventory = await Inventory.find().sort({ date: -1 });
        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
