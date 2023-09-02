import React from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import {Container, Grid, Card, Typography } from '@mui/material';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AdminMenu />
          </Grid>

          
          <Grid item xs={12} md={9}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h4">Admin Name: {auth?.user?.name}</Typography>
              <Typography variant="h4">Admin Email: {auth?.user?.email}</Typography>
              <Typography variant="h4">Admin Contact: {auth?.user?.phone}</Typography>
            </Card>
          </Grid>
        </Grid>
        </Container>
    </Layout>
  );
};

export default AdminDashboard;
