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
        let member = await Member.findOne({ account });

        // Check if account is not member
        if (!member) {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let findProduct = await Product.findOne({ _id: product });
            if (!findProduct) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: "Your Product does not exist" }] });
            }

            let unitPrice, total;
            unitPrice = findProduct.sellingPrice;
            total = qty * unitPrice;

            let invoiceDetail = new InvoiceDetail({
                invoice,
                findProduct,
                qty,
                unitPrice,
                total
            });

            // Save
            await invoiceDetail.save();

            res.json({ invoiceDetail });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
