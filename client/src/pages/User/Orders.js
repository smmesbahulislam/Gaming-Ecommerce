import React from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from './../../components/Layout/Layout';
import { Container, Grid, Typography } from '@mui/material';

const Orders = () => {
  return (
    <Layout title={'Your Orders'}>
      {/* <Container> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <UserMenu />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" component="h1">
              All Orders
            </Typography>
          </Grid>
        </Grid>
      {/* </Container> */}
    </Layout>
  );
};

export default Orders;
