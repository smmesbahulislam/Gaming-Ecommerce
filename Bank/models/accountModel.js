import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    accountNo: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation function to check if balance is non-negative
                return value >= 0;
            },
            message: "Balance cannot be negative",
        },
    },
})

export default mongoose.model("Account", accountSchema);