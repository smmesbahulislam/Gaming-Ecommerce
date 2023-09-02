import accountModel from "../models/accountModel.js";


export const createBankAccountController = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, address, accountNo, balance } = req.body;
        //validation
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!accountNo) {
            return res.send({ message: "Account number is Required" });
        }
        if (!address) {
            return res.send({ message: "address is Required" });
        }
        if (!balance) {
            return res.send({ message: "Balance is Required" });
        }
        //check user 
        const existingAccount = await accountModel.findOne({ accountNo });
        //existing account
        if (existingAccount) {
            return res.status(200).send({
                success: false,
                message: 'Account already exists with same account number.'
            })
        }

        //create account
        const account = await accountModel({ name, email, accountNo, address, balance }).save();
        res.status(201).send({
            success: true,
            message: 'Bank account created successfully.',
            account
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating bank account",
            error
        })

    }
}

export const updateBankAccountBalanceController = async (req, res) => {
    try {
        const { accountNo } = req.params;
        console.log(accountNo)
        const { balance } = req.body;
        //check user 
        const existingAccount = await accountModel.findOne({ accountNo });
        if (!existingAccount) {
            return res.status(404).send({
                success: false,
                message: "Account doesn't exist.Please create an account first.",
            })
        }

        //update balance mean deposite
        const newBalance = existingAccount.balance + balance;
        const depositeMoney = await accountModel.updateOne(
            { accountNo },
            { $set: { balance: newBalance } },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Balance desposite successfully."
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating bank balance."
        })

    }
}

export const getBalanceOfAccountController = async (req, res) => {
    try {
        const { accountNo } = req.params;
        //check user 
        const existingAccount = await accountModel.findOne({ accountNo });
        if (!existingAccount) {
            return res.status(404).send({
                success: false,
                message: "Account doesn't exist.Please create an account first.",
            })
        }

        // Hide the first characters of the account number
        const maskedAccountNo = "******" + accountNo.slice(-3);

        res.status(200).send({
            success: true,
            message: `The balance of ${maskedAccountNo} is : $${existingAccount.balance}.`
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while fetching account balance"
        })

    }
}

