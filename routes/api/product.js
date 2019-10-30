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
        auth
        // check("name", "Name is required")
        //     .not()
        //     .isEmpty(),
        // check("importPrice", "Import Price is required").isLength({
        //     min: 1
        // }),
        // check("sellingPrice", "Selling Price is required").isLength({
        //     min: 1
        // }),
        // check("expired", "Expired is required")
        //     .not()
        //     .isEmpty(),
        // check("qty", "Expired is required")
        //     .not()
        //     .isEmpty(),
        // check("image", "Images is required")
        //     .not()
        //     .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            description,
            image,
            importPrice,
            sellingPrice,
            expired,
            qty,
            isExists,
            dateCreate,
            isDamage,
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

        let findSupplier = {};
        let findCategory = {};

        if (dateCreate === undefined) {
            findCategory = await Category.findOne({ name: category });
            findSupplier = await Supplier.findOne({ name: supplier });
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
        } else {
            findCategory = await Category.findOne(category);
            findSupplier = await Category.findOne(supplier);
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
        }

        try {
            let product = await Product.findOne({ name });
            let inventory = await Inventory.findOne({ product: product });
            if (product) {
                console.log("if");
                product.name = name;
                product.description = description;
                product.image = image;
                product.importPrice = importPrice;
                product.sellingPrice = sellingPrice;
                product.expired = expired;
                product.category = findCategory;
                product.isExists = isExists;

                await product.save();
            } else {
                console.log("else");
                product = new Product({
                    name,
                    description,
                    image,
                    importPrice,
                    sellingPrice,
                    expired,
                    category: findCategory
                    // isExists: true
                });

                await product.save();
            }

            // Calculate expiration date
            let expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + Number(expired));

            if (inventory) {
                // Update Inventory
                inventory.product = product;
                inventory.receiptDate = new Date();
                inventory.expirationDate = expirationDate;
                inventory.qty = qty;
                inventory.isDamage = isDamage;

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
            console.log(product.isExists);
            console.log(typeof product.isExists);
            if (product.isExists === true) {
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

                return res.json({
                    product,
                    inventory,
                    goodsReceipt,
                    goodsReceiptDetail
                });
            }
            return res.json({ product, inventory });
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

        // Check expired day of product
        for (let product of products) {
            product.dateCreate.setDate(
                product.dateCreate.getDate() + product.expired
            );

            if (product.dateCreate === new Date()) {
                product.isExists = false;
                let inventory = await Inventory.findOne({ product: product });
                inventory.product.isExists = false;
                inventory.isDamage = true;
                await product.save();
                await inventory.save();
            } else {
                continue;
            }
        }
        return res.json(products);
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

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        product.isExists = false;

        inventory.product = product;
        inventory.isDamage = true;
        // console.log(inventory);

        await product.save();
        await inventory.save();

        return res.json({ msg: "Product removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Product not found" });
        }
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
