const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Supplier = require("../../models/Supplier");
const Category = require("../../models/Category");
const Inventory = require("../../models/Inventory");
const Product = require("../../models/Product");

// @route   POST api/product
// @desc    Create Product & add this to Inventory
// @access  Private
router.post(
    "/",
    [
        auth,
        check("_id", "ID is required")
            .not()
            .isEmpty(),
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("importPrice", "Import Price is required").isLength({
            min: 1
        }),
        check("sellingPrice", "Selling Price is required").isLength({
            min: 1
        }),
        check("expired", "Expired is required")
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

        const {
            _id,
            name,
            description,
            images,
            importPrice,
            sellingPrice,
            expired,
            qty,
            category,
            supplier
        } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        let findCategory = await Category.findOne({ name: category });
        let findSupplier = await Supplier.findOne({ name: supplier });

        if (!findCategory || !findSupplier || sellingPrice <= importPrice) {
            return res.status(400).json({
                errors: [
                    {
                        msg:
                            "Your Information inputted was wrong. Please check again"
                    }
                ]
            });
        } else if (!findCategory.isExists || !findSupplier.isExists) {
            return res.status(400).json({
                errors: [
                    {
                        msg:
                            "Information about Category or Supplier is not exists. Please check again"
                    }
                ]
            });
        }

        try {
            // let product = await Product.findOne({_id:id})

            let product = new Product({
                _id,
                name,
                description,
                images,
                importPrice,
                sellingPrice,
                expired,
                category: findCategory,
                supplier: findSupplier
            });

            await product.save();

            // Calculate expiration date
            let expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + Number(expired));

            // // Add this product to inventory
            let inventory = new Inventory({
                product: product,
                qty: qty,
                expirationDate: expirationDate
            });

            await inventory.save();

            res.json({ product, inventory });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route    GET api/product
// @desc     Get all product
// @access   Private
router.get("/", auth, async (req, res) => {
    try {
        const products = await Product.find().sort({ date: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
