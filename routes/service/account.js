const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const Account = require("../../models/Account");
const Member = require("../../models/Member");
const Customer = require("../../models/Customer");
const Role = require("../../models/Role");

exports.create = async function(account) {
    const { name, email, password, phone, code, birthday, address } = account;
    try {
        let findEmail = await Account.findOne({ email: email });
        let findPhone = await Account.findOne({ phone: phone });

        if (findEmail) {
            return res.status(400).json({
                errors: [
                    {
                        param: "email",
                        msg: "Your email was existed"
                    }
                ]
            });
        }

        if (findPhone) {
            return res.status(400).json({
                errors: [
                    {
                        param: "phone",
                        msg: "Your phone was existed"
                    }
                ]
            });
        }

        const avatar = gravatar.url(email, {
            s: 200,
            r: "pg",
            d: "mm"
        });

        account = new Account({
            name,
            email,
            password,
            phone,
            code,
            birthday,
            address,
            avatar
        });
        const salt = await bcrypt.genSalt(10);

        account.password = await bcrypt.hash(password, salt);

        delete password;

        await account.save();

        let role = await Role.findOne({ code });

        if (role) {
            if (role.qty <= 0) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Your Code is Expired"
                        }
                    ]
                });
            }

            let member = await Member.findOne({ account: account.id });

            // check if account member's exists
            if (member) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Your Account already Exists"
                        }
                    ]
                });
            }
            member = new Member({
                account: account,
                role: role
            });

            role.qty -= 1;

            await role.save();
            await member.save();
        } else {
            let customer = await Customer.findOne({ account: account.id });
            // check if account customer's exists
            if (customer) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Your Account already exists"
                        }
                    ]
                });
            }

            customer = new Customer({
                account: account
            });

            await customer.save();
        }

        return account;
    } catch (error) {
        console.error(error);
    }
};
