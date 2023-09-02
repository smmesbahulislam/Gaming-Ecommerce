import React from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import { Grid, Card, Typography } from '@mui/material';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <UserMenu />
          </Grid>
          <Grid item xs={9}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h4">{auth?.user?.name}</Typography>
              <Typography variant="h4">{auth?.user?.email}</Typography>
              <Typography variant="h4">{auth?.user?.address}</Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;
