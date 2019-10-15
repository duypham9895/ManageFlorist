const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// const Role = require("../../models/Role");
const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Supplier = require("../../models/Supplier");
const Category = require("../../models/Category");
const Inventory = require("../../models/Inventory");
const Product = require("../../models/Product");
const GoodsReceipt = require("../../models/GoodsReceipt");
const GoodsReceiptDetail = require("../../models/GoodsReceiptDetail");

// @route   POST api/product
// @desc    Create Product & add this to Inventory
// @access  Private
router.post(
    "/",
    [
        auth,
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
            .isEmpty(),
        check("images", "Images is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
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
        let member = await Member.findOne({ account: account });
        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        let findCategory = await Category.findOne({ name: category });
        let findSupplier = await Supplier.findOne({ name: supplier });

        if (
            !findCategory ||
            !findSupplier ||
            Number(sellingPrice) < Number(importPrice)
        ) {
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
            let product = await Product.findOne({ name });

            if (product) {
                product.name = name;
                product.description = description;
                product.images = images;
                product.importPrice = importPrice;
                product.sellingPrice = sellingPrice;
                product.expired = expired;
                product.category = category;

                await product.save();
            } else {
                product = new Product({
                    name,
                    description,
                    images,
                    importPrice,
                    sellingPrice,
                    expired,
                    category: findCategory
                });

                await product.save();
            }

            // Calculate expiration date
            let expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + Number(expired));

            let inventory = await Inventory.findOne({ product: product });

            if (inventory) {
                // Update Inventory
                inventory.product = product;
                inventory.receiptDate = new Date();
                inventory.expirationDate = expirationDate;
                inventory.qty = qty;
                inventory.isDamage = false;

                await inventory.save();
            } else {
                // Create new product in inventory
                inventory = new Inventory({
                    product: product,
                    qty: qty,
                    expirationDate: expirationDate
                });

                await inventory.save();
            }

            // Goods Receipt
            let total = qty * product.importPrice;
            let goodsReceipt = new GoodsReceipt({
                member: member,
                supplier: findSupplier,
                total: total
            });
            await goodsReceipt.save();

            // Goods Receipt Detail
            let goodsReceiptDetail = new GoodsReceiptDetail({
                goodsReceipt: goodsReceipt,
                product: product,
                qty: qty,
                unitPrice: product.importPrice
            });
            await goodsReceiptDetail.save();

            res.json({ product, inventory, goodsReceipt, goodsReceiptDetail });
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
    let account = await Account.findById(req.account.id);
    let member = await Member.findOne({ account });

    // Check if account is not member
    if (!member) {
        return res
            .status(401)
            .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
    }
    try {
        const products = await Product.find().sort({ date: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route    DELETE api/product/:id
// @desc     Delete a product
// @access   Private
router.delete("/:id", auth, async (req, res) => {
    try {
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

        let product = await Product.findById(req.params.id);
        let inventory = await Inventory.findOne({ product });
        // console.log(inventory.product._id);
        // console.log(product._id);
        // console.log(
        //     "inventory = ",
        //     inventory.product.images === product.images
        // );

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        product.isExists = false;

        inventory.product = product;
        inventory.isDamage = true;
        // console.log(inventory);

        await product.save();
        await inventory.save();

        res.json({ msg: "Product removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            console.log("test");
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;
