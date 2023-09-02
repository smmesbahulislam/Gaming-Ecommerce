import accountModel from "../models/accountModel.js";
import transactionModel from "../models/transactionModel.js";

const postTransaction = async(senderAccount, receiverAccount, balance) => {
    const senderAccountNo = senderAccount.accountNo;
    const receiverAccountNo = receiverAccount.accountNo;
    const max = 100;
    const randomNumber = parseInt(Math.floor(Math.random() * max));
    const transactionId = `${Date.now()}${randomNumber}`;
    const transaction = await transactionModel({
        senderAccountNo,
        receiverAccountNo,
        transactionAmount: balance,
        transactionId
    }).save();

    return transactionId;
}

export const makeTransactionController = async(req, res) => {
    try {
        const {senderAccountNo, receiverAccountNo, transactionAmount} = req.body;
        const receiverAccount = await accountModel.findOne({accountNo: receiverAccountNo})
        //check wheather sender have account in the bank or not
        const senderBankAccount = await accountModel.findOne({accountNo: senderAccountNo});
        if(!senderBankAccount){
            return res.status(404).send({
                success: false,
                message: "You don't have account in the bank.Please create a bank account."
            })
        }

        //check wheather sender have enough money in his/her bank account
        const senderBankBalance = senderBankAccount.balance;
        if(transactionAmount > senderBankBalance){
            return res.status(400).send({
                success: false,
                message: "You don't have enough balance in the bank."
            })
        }

        const senderNewBalance = senderBankAccount.balance - transactionAmount;
        const receiverNewBalance = receiverAccount.balance + transactionAmount;

        //update sender account balance
        await accountModel.updateOne(
            {accountNo: senderAccountNo},
            {$set: {balance: senderNewBalance}},
            {new : true}
        )

        //update receiver account balance
        await accountModel.updateOne(
            {accountNo: receiverAccountNo},
            {$set: {balance: receiverNewBalance}},
            {new : true}
        )

        //add transaction to the transaction collection
        const transactionId = await postTransaction(
            senderBankAccount,
            receiverAccount,
            transactionAmount
        )
        
        return res.status(200).send({
            success: true,
            message: `Transaction complete.$${transactionAmount} from ${senderAccountNo} transferred to ${receiverAccountNo}.`,
            transactionId
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Transaction failed due to server error."
        })
        
    }
}
