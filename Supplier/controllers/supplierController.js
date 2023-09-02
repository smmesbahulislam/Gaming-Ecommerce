import orderModel from "../models/orderModel.js";
import productModel from '../models/productModel.js';
import userModel from "../models/userModel.js";
import axios from 'axios'

export const getConfirmedOrders = async(req,res) => {
    try {
        const orders = await orderModel
            .find({orderStatus: "confirmed"})
            .populate({
                path: "user",
                select: "-password -answer -role"
            })
            .populate({
                path: "products.product",
                select: "-photo -quantity -slug"
            })
            .exec();

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to fetch confirmed orders"
        })
        
    }
}

export const getShippingOrders = async(req, res ) => {
    try {
        const orders = await orderModel
            .find({ orderStatus: "shipping" }) // Filtering orders by orderStatus
            .populate({
                path: "user",
                select: "-password -answer -role"
            })
            .populate({
                path: "products.product",
                select: "-photo  -quantity -slug"
            })
            .exec();

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }

}

export const getAllShippedOrders = async(req, res) => {
    try {
        const orders = await orderModel
            .find({orderStatus: "shipped"})
            .populate({
                path: "user",
                select: "-password -answer -role"
            })
            .populate({
                path: "products.product",
                select:"-photo -quantity -slug"
            })
            .exec();

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Faild to fetch shipped orders"
        })
        
    }
}

export const updateOrderStatusUsingOid = async (req, res) => {
    const { oid } = req.params; // Get the orderId from request parameters
    console.log(oid)
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



