import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'

import DashboardLayout from '../DashboardLayout'
import { TotalSales } from './TotalSales'
import { useGetOrders } from '../../../hooks/useGetOrders'
import { TotalCustomers } from './TotalCustomers'
import { TotalOrders } from './TotalOrders'

export default function DashboardOverview() {
  const [totalSales, setTotalSales] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await useGetOrders()
        const total = orders.reduce((acc, order) => {
          return acc + parseFloat(order.total)
        }, 0)
        setTotalSales(total)
        const customers = orders.map((order) => {
          return order.firstname + ' ' + order.lastname
        })
        const uniqueCustomers = customers.filter((value, index, array) => {
          return array.indexOf(value) === index
        })
        setTotalCustomers(uniqueCustomers.length)
        setTotalOrders(orders.length)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [])
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
      </Grid>
    </DashboardLayout>
  )
}
