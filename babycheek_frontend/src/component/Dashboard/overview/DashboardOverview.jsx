import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import DashboardLayout from '../DashboardLayout'
import { TotalSales } from './TotalSales'
import { useGetOrders } from '../../../hooks/useGetOrders'
import { TotalCustomers } from './TotalCustomers'
import { TotalOrders } from './TotalOrders'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderData } from '../../../Redux/actions/cartActions'
import SalesGraph from './SalesGraph'


export default function DashboardOverview() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchOrderData());
  }, [dispatch]);

  const allOrders = useSelector((state) => state.dashboard.orders);
  const totalOrders = allOrders.length;
  const totalCustomers = useSelector((state) => state.dashboard.total_customers);
  const totalSales = useSelector((state) => state.dashboard.total_sales);
  console.log("total customers" + totalCustomers);

  console.log("ALL ORDERS", allOrders, totalCustomers, totalSales);
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12}>
          <TotalSales diff={280} trend='up' value={totalSales} sx={{ height: '100%' }} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalCustomers diff={25} trend='up' sx={{ height: '100%' }} value={totalCustomers} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          <TotalOrders diff={10} trend='up' sx={{ height: '100%' }} value={totalOrders} />
        </Grid>
        <Grid lg={3} sm={6} xs={12}>
          {/* <TotalProfit sx={{ height: '100%' }} value='$15k' /> */}
        </Grid>
        <Grid lg={8} xs={12}>
          {/* <Sales
            chartSeries={[
              { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
              { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] }
            ]}
            sx={{ height: '100%' }}
          /> */}
        </Grid>
        <Grid lg={4} md={6} xs={12}></Grid>
        <SalesGraph totalOrders={totalOrders}/>
      </Grid>
    </DashboardLayout>
  )
}
