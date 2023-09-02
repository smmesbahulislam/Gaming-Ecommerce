import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    senderAccountNo:{
        type: String,
        required: true,
    },
    receiverAccountNo: {
        type: String,
        required: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    }
},{timestamps: true})

export default mongoose.model("Transactions",transactionSchema);