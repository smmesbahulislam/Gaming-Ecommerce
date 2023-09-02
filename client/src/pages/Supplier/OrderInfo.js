import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import OrderMenu from '../../components/Layout/OrderMenu';
import { Container, Grid, Card, Typography } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';
import './orderInfo.css';
import axios from 'axios';


const OrderInfo = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newOrderStatus, setNewOrderStatus] = useState("");

    const getAllConfirmedOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SUPPLIER_API}/api/v1/supplier/get-confirmedOrders`)
            setOrders(data.orders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllConfirmedOrders();
    }, [])

    const openAction = (order) => {
        setSelectedOrder(order)
        setAction(true);
    }

    const closeAction = () => {
        setSelectedOrder(null)
        setAction(false);
    }

    const openInfo = (order) => {
        setSelectedOrder(order)
        setOpen(true);
    }
    const closeInfo = () => {
        setOpen(false);
        setSelectedOrder(null)
    }

    const handleStatusChange = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API}/api/v1/orders/update-orders/${selectedOrder?.orderId}`, {
                newOrderStatus
            });
            getAllConfirmedOrders();
            closeAction();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <Layout>
        //   <Container>
        //     <Grid container spacing={3}>
        //       <Grid item xs={12} md={3}>
        //         <OrderMenu/>
        //       </Grid>
        //       <Grid item xs={12} md={9}>
        //       <section className='order-table'>
        //                 <table width="100%">
        //                     <thead>
        //                         <tr>
        //                             <td>Id</td>
        //                             <td>Price</td>
        //                             <td>Info</td>
        //                             <td>Status</td>
        //                             <td>Action</td>
        //                             {/* <td>Subtotal</td> */}
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td>1234</td>
        //                             <td>price</td>
        //                             <td>
        //                                 <button className='info-btn'>Info</button>
        //                             </td>
        //                             <td>Confirmed</td>
        //                             <td>
        //                                 <button className='info-btn'>Action</button>
        //                             </td>
        //                         </tr>
        //                         <tr>
        //                             <td>1234</td>
        //                             <td>price</td>
        //                             <td>
        //                                 <button className='info-btn' onClick={openInfo}>Info</button>
        //                             </td>
        //                             <td>Confirmed</td>
        //                             <td>
        //                                 <button className='info-btn' onClick={openAction}>Action</button>
        //                             </td>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //             </section>
        //       </Grid>
        //     </Grid>
        //     </Container>

        //     <Dialog
        //     open={open}
        //     keepMounted
        //     onClose={closeInfo}
        //     aria-labelledby="checkout-dialog-title"
        //      aria-describedby="checkout-dialog-description"
        //     >
        //     <DialogTitle align="center">
        //         Order Information
        //     </DialogTitle>
        //     <DialogContent>
        //         <h4>Order ID</h4>
        //         <br/>
        //         <h5>Product Information:</h5>
        //         <section className='order-table dialog'>
        //         <table width="100%">
        //                     <thead>
        //                         <tr>
        //                             <td>ID</td>
        //                             <td>Name</td>
        //                             <td>Quantity</td>
        //                             {/* <td>Subtotal</td> */}
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         <tr>
        //                             <td>1234</td>
        //                             <td>Name</td>
        //                             <td>quantity</td>
        //                         </tr>
        //                     </tbody>
        //         </table>
        //         </section>
        //         <div classname='order-info' style={{marginTop: '30px'}}>
        //         <div className='order-1'>
        //             <h5>Billing Info: u8redf</h5>
        //             <h5>Contact No: 01826700175</h5>
        //         </div>
        //         <div className='order-2'>
        //             <h5>Order At: 12.34</h5>
        //             <h5>Transaction Id: alsdfdskjfwo45u89ewurih</h5>
        //         </div>
        //         </div>
        //     </DialogContent>
        //     <DialogActions>
        //     <Button onClick={closeInfo} color="primary">
        //         Cancel
        //     </Button>
        //     </DialogActions>
        //     </Dialog>


        //     <Dialog
        //     open={action}
        //     keepMounted
        //     onClose={closeAction}
        //     aria-labelledby="checkout-dialog-title"
        //      aria-describedby="checkout-dialog-description"
        //     >
        //     <DialogTitle>
        //         Change Order Status
        //     </DialogTitle>
        //     <DialogContent>
        //         <h3>Current order Status: Confirmed</h3>
        //         <div className='new-status'>
        //         <h3>New Order Satus: </h3>
        //         <select style={{marginRight: '20px'}}>
        //             <option>Pending</option>
        //             <option>Confirmed</option>
        //             <option>Shipping</option>
        //             <option>Shipped</option>
        //             <option>Delivering</option>
        //             <option>Delivered</option>
        //         </select>
        //     </div>
        //     </DialogContent>
        //     <DialogActions>
        //     <Button onClick={closeAction} color="primary">
        //         Cancel
        //     </Button>
        //     <Button onClick={handleSubmit} color="primary">
        //         Submit
        //     </Button>
        //     </DialogActions>

        //     </Dialog>

        // </Layout>
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
                                        <td>Action</td>
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
                                            <td>
                                                <button className='info-btn' onClick={() => openAction(order)}>Action</button>
                                            </td>
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


            <Dialog
                open={action}
                keepMounted
                onClose={closeAction}
                aria-labelledby="checkout-dialog-title"
                aria-describedby="checkout-dialog-description"
            >
                <DialogTitle>
                    Change Order Status
                </DialogTitle>
                <DialogContent>
                    <h3>Current order Status: {selectedOrder?.orderStatus}</h3>
                    <div className='new-status'>
                        <h3>New Order Satus: </h3>
                        <select
                            style={{ marginRight: '20px' }}
                            value={newOrderStatus}
                            onChange={(e) => setNewOrderStatus(e.target.value)}
                        >
                            {/* <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipping">Shipping</option>
                            <option value="shipped">Shipped</option> */}
                            {
                                selectedOrder?.orderStatus === 'confirmed' && (
                                    <>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="shipping">Shipping</option>
                                        <option value="shipped">Shipped</option>
                                    </>
                                )
                            }
                        </select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAction} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleStatusChange} color="primary">
                        Submit
                    </Button>
                </DialogActions>

            </Dialog>

        </Layout>
    )
}


export default OrderInfo