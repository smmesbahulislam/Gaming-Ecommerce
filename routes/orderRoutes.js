import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
import { createOrderController, getDeliveredOrders,  updateOrderStatusUsingOid, getAllOrderController, getShippingOrders, getOrdersByUserId } from '../controllers/orderController.js';
const router = express.Router();

//create-order || POST
router.post('/create-order',requireSignIn,createOrderController)

//get all orders || get
router.get('/get-allOrder',requireSignIn,isAdmin,getAllOrderController)

//get all shipping order || get
router.get('/get-shippingOrders',getShippingOrders)

//get all delivered order || get
router.get('/get-deliveredOrders',getDeliveredOrders)

//get orders by userId || get
router.get('/get-orders/:uid',requireSignIn,getOrdersByUserId)

//update order (ig: orderStatus(processing) -> orderStatus(shipping)) || PUT
router.put('/update-orders/:oid',updateOrderStatusUsingOid)


export default router;