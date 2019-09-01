const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

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

        let user = await User.findById(req.user.id);
        let findRole = await Role.findById(user.role);

        if (findRole.name !== "ADMIN") {
            return res
                .status(401)
                .json({ errors: [{ msg: "Your Account is Unauthorized" }] });
        }

        try {
            let role = await Role.findOne({ code });

            if (role) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Role already exists" }] });
            }

            const newRole = new Role({
                name,
                code,
                qty
            });

            await newRole.save();

            res.json(newRole);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
