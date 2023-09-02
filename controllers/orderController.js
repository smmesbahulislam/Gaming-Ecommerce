import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import axios from 'axios';

//helper functions

// Generate a unique order ID using userId and productsId
// const generateUniqueOrderId = (userId, productsId) => {
//     const uniqueString = userId + productsId; // Combine userId and productsId string
//     const hashedString = Buffer.from(uniqueString).toString("base64"); // Convert the combined string to base64 hash
//     return hashedString;
// };

const generateUniqueOrderId = (userId, productsId) => {
    const timestamp = Date.now(); // Get current timestamp
    const uniqueString = `${timestamp}`; // Combine userId, timestamp, and productsId
    // const hashedString = Buffer.from(uniqueString).toString("base64"); // Convert the combined string to base64 hash
    return uniqueString;
};


//make transaction api call
const transaction = async (senderAccountNumber, receiverAccountNumber, transactionAmount) => {
    try {
        const res = await axios.post(`${process.env.BANK_API}/api/v1/transaction/make-transaction`, {
            senderAccountNo: senderAccountNumber,
            receiverAccountNo: receiverAccountNumber,
            transactionAmount: transactionAmount
        });

        if (res.data.success) {
            console.log(res.data.message);
            return res;
        }
        else {
            console.log(res.data.message)
        }
    } catch (error) {
        console.log(error)

    }
}


//controllers
export const createOrderController = async (req, res) => {
    try {
        const {
            user,
            products,
            bankAccountNumber,
            billingAddress,
            contactNumber,
            orderPrice,
        } = req.body;



        // console.log(req.body)
        //ok

        const orderId = generateUniqueOrderId(user, products);

        // console.log(orderId);
        //ok

        // console.log(process.env.ECOMMERCE_BANK_ACCOUNT_NUMBER)
        //ok

        const transactionRes = await transaction(bankAccountNumber, process.env.ECOMMERCE_BANK_ACCOUNT_NUMBER, orderPrice);

        // console.log(transactionRes.data);
        // console.log(transactionRes);
        //ok
        const transactionId = transactionRes.data.transactionId

        const order = new orderModel({
            user,
            products,
            orderId,
            billingAddress,
            contactNumber,
            orderPrice,
            orderTransactionId: transactionId,
        });

        // console.log(order.user);
        // console.log(user);


        await order.save();

        res.status(201).json({ success: true, message: "Order created successfully." })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

export const getAllOrderController = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate({
                path: "user",
                select: "-password -answer -role"
            })
            .populate({
                path: "products.product",
                select: "-photo -quantity -slug"
            })
            .exec();

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

export const getShippingOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ orderStatus: "shipping" }) // Filtering orders by orderStatus
            .populate({
                path: "user",
                select: "-password -answer -role"
            })
            .populate({
                path: "products.product",
                select: "-photo -quantity -slug"
            })
            .exec();

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
}

export const getDeliveredOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({orderStatus: "delivered"})
            .populate({
                path: "user",
                select: "-password -answer -role"
            })
            .populate({
                path:"products.product",
                select: "-photo -quantity -slug"
            })
            .exec();

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Faild to get delivered orders"
        })
        
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const {uid} = req.params;
        const orders = await orderModel
        .find({user: uid})
        .populate({
            path:"products.product",
            select:"-photo -quantity -slug"
        })
        .exec();

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Faild to fetch orders"
        })
        
    }
}

export const updateOrderStatusUsingOid = async (req, res) => {
    const { oid } = req.params; // Get the orderId from request parameters
    const { newOrderStatus } = req.body; // Get the new orderStatus from request body

    try {
        // Find the order by orderId and update its orderStatus
        const updatedOrder = await orderModel.findOneAndUpdate(
            { orderId: oid },
            { orderStatus: newOrderStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, updatedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to update order status" });
    }
};



