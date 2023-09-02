import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import OrderMenu from '../../components/Layout/OrderMenu';
import './orderInfo.css';

const OrderShipped = () => {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getAllShippedOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SUPPLIER_API}/api/v1/supplier/get-shippedOrders`)
            setOrders(data.orders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllShippedOrders();
    }, [])


    const openInfo = (order) => {
        setSelectedOrder(order)
        setOpen(true);
    }
    const closeInfo = () => {
        setOpen(false);
        setSelectedOrder(null)
    }


    return (
        <Layout>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <OrderMenu />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <section className='order-table'>
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td>Id</td>
                                        <td>Price</td>
                                        <td>Info</td>
                                        <td>Status</td>
                                        {/* <td>Action</td> */}
                                        {/* <td>Subtotal</td> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order.orderId.slice(-10)}</td>
                                            <td>{order.orderPrice}</td>
                                            <td>
                                                <button className='info-btn' onClick={() => openInfo(order)}>Info</button>
                                            </td>
                                            <td>{order.orderStatus}</td>
                                            {/* <td>
                                                <button className='info-btn' onClick={() => openAction(order)}>Action</button>
                                            </td> */}
                                        </tr>
                                    ))}
                                    {/* <tr>
                                <td>1234</td>
                                <td>price</td>
                                <td>
                                    <button className='info-btn' onClick={openInfo}>Info</button>
                                </td>
                                <td>Confirmed</td>
                                <td>
                                    <button className='info-btn' onClick={openAction}>Action</button>
                                </td>
                            </tr> */}
                                </tbody>
                            </table>
                        </section>
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={open}
                keepMounted
                onClose={closeInfo}
                aria-labelledby="checkout-dialog-title"
                aria-describedby="checkout-dialog-description"
            >
                <DialogTitle align="center">
                    Order Information
                </DialogTitle>
                <DialogContent>
                    <h4>Order ID: {selectedOrder?.orderId.slice(-20)}</h4>
                    <br />
                    <h5>Product Information:</h5>
                    <section className='order-table dialog'>
                        <table width="100%">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    {/* <td>Subtotal</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedOrder?.products?.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product.product._id.slice(-20)}</td>
                                            <td>{product.product.name}</td>
                                            <td>{product.quantity}</td>
                                        </tr>
                                    ))
                                }
                                {/* <tr>
                            <td>1234</td>
                            <td>Name</td>
                            <td>quantity</td>
                        </tr> */}
                            </tbody>
                        </table>
                    </section>
                    <div classname='order-info' style={{ marginTop: '30px' }}>
                        <div className='order-1'>
                            <h5>Billing Info: {selectedOrder?.billingAddress}</h5>
                            <h5>Contact No: {selectedOrder?.contactNumber}</h5>
                        </div>
                        <div className='order-2'>
                            <h5>Order At: {selectedOrder?.createdAt}</h5>
                            <h5>Transaction Id: {selectedOrder?.orderTransactionId}</h5>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeInfo} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            

        </Layout>
    )
}


export default OrderShipped