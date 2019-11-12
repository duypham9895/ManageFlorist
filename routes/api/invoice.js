const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Models
const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Customer = require("../../models/Customer");
const Discount = require("../../models/Discount");
const Invoice = require("../../models/Invoice");
const Product = require("../../models/Product");
const Inventory = require("../../models/Inventory");
const InvoiceDetail = require("../../models/InvoiceDetail");

// Service
const accountService = require("../service/account");

// @route   POST api/invoice
// @desc    Create invoice
// @access  Private
router.post(
    "/",
    [
        auth,
        check("phone", "Phone is required").isMobilePhone(),
        check("name", "Name is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, phone, code } = req.body;

        let account = await Account.findById(req.account.id);
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            // Find customer
            account = await Account.findOne({ phone });
            let customer = await Customer.findOne({ account });

            // Find code discount
            let discount = await Discount.findOne({ code });

            // Create invoice if this customer exists
            if (customer) {
                let invoice = new Invoice({
                    customer: customer,
                    member: member,
                    discount: discount
                });

                await invoice.save();

                res.json({ invoice });
            } else {
                account = new Account({
                    name,
                    phone,
                    password: phone
                });

                account = await accountService.create(account);
                customer = await Customer.findOne({ account });

                let invoice = new Invoice({
                    customer: customer,
                    member: member,
                    discount: discount
                });

                await invoice.save();

                res.json({ invoice });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route   POST api/invoice/detail
// @desc    Create invoice detail
// @access  Private
router.post(
    "/detail",
    [
        auth,
        check("qty", "Qty is required").isNumeric(),
        check("invoice", "Invoice is required")
            .not()
            .isEmpty(),
        check("product", "Product is required")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { invoice, product, qty } = req.body;

        let account = await Account.findById(req.account.id);
        // console.log(account);
        let member = await Member.findOne({ account });
        // console.log(member);

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let findProduct = await Product.findOne({ name: product });
            let inventory = await Inventory.findOne({ product: findProduct });
            let findInvoice = await Invoice.findById(invoice);

            // console.log(findInvoice, invoice);

            if (
                !findProduct ||
                !inventory ||
                inventory.isDamage ||
                !findProduct.isExists
            ) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: "Your Product does not exist" }] });
            }

            if (inventory.qty < qty) {
                return res.status(401).json({
                    errors: [{ msg: "Qty of Product don't have enough" }]
                });
            }

            let unitPrice;
            unitPrice = findProduct.sellingPrice;

            let invoiceDetail = new InvoiceDetail({
                invoice: findInvoice,
                product: findProduct,
                qty,
                unitPrice
            });

            // Calculate total of product
            let total = qty * unitPrice;

            // Check if it has discount, it will decrease total
            if (findInvoice.discount !== null) {
                total = total * (1 - findInvoice.discount.percent);
            }
            inventory.qty -= qty;
            findInvoice.total += total;

            // Set point and level for Customer
            let point = 0;

            if (total > 999) {
                point = total / 1000;
            } else {
                point = total / 100;
            }
            let customer = await Customer.findOne(findInvoice.customer);
            customer.point += point;

            if (customer.point >= 100) {
                customer.level = "BRONZE";
            } else if (customer.point >= 300) {
                customer.level = "SILVER";
            } else if (customer.point >= 700) {
                customer.level = "GOLD";
            } else if (customer.point >= 2000) {
                customer.level = "DIAMOND";
            }

            // Calculate target for member
            if (member.sold !== null) {
                member.sold += total;
            }

            findInvoice.customer = customer;
            findInvoice.member = member;
            invoiceDetail.invoice = findInvoice;

            // Save
            await customer.save();
            await member.save();
            await inventory.save();
            await findInvoice.save();
            await invoiceDetail.save();

            res.status(200).json({ invoiceDetail });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

// @route   GET api/invoice
// @desc    Get all invoices
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
        const invoices = await Invoice.find().sort({ date: -1 });

        return res.json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route   GET api/invoice/:id
// @desc    Get detail invoice
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
        const invoice = await Invoice.findById(req.params.id);
        const invoiceDetail = await InvoiceDetail.find({
            "invoice._id": invoice._id
        });

        return res.json(invoiceDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
