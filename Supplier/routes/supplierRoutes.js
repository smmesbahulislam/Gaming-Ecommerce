import express from 'express'
import { getConfirmedOrders, getShippingOrders, getAllShippedOrders, updateOrderStatusUsingOid } from '../controllers/supplierController.js';


const router = express.Router();


//get all confirmed orders || GET
router.get('/get-confirmedOrders',getConfirmedOrders)

//get all shipping orders || GET
router.get('/get-shippingOrders',getShippingOrders)

//get all shipped orders || GET
router.get("/get-shippedOrders",getAllShippedOrders)

//update order status || PUT
router.put('/update-orders/:oid',updateOrderStatusUsingOid)


export default router;