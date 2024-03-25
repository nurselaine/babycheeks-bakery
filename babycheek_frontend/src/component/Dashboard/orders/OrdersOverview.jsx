import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download'
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus'
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload'

import DashboardLayout from './../DashboardLayout'
import { useGetOrders } from '../../../hooks/useGetOrders'
import { OrderFilters } from './OrdersFilter'
import { OrdersTable } from './OrdersTable'

export const metadata = { title: `Customers | Dashboard` }

const OrdersOverview = () => {
  const page = 0
  const rowsPerPage = 25
  const [orderInfo, setOrderInfo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let orders = await useGetOrders()
        orders = orders.sort((a, b) => {
          return new Date(b.order_date) - new Date(a.order_date)
        })
        setOrderInfo(orders)
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchData()
  }, [])

  const paginatedOrders = applyPagination(orderInfo, page, rowsPerPage)
  return (
    <DashboardLayout>
      <Stack spacing={3}>
        <Stack direction='row' spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant='h4'>Orders</Typography>
            <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
              <Button color='inherit' startIcon={<UploadIcon fontSize='var(--icon-fontSize-md)' />}>
                Import
              </Button>
              <Button color='inherit' startIcon={<DownloadIcon fontSize='var(--icon-fontSize-md)' />}>
                Export
              </Button>
            </Stack>
          </Stack>
          <div>
            <Button startIcon={<PlusIcon fontSize='var(--icon-fontSize-md)' />} variant='contained'>
              Add
            </Button>
          </div>
        </Stack>
        <OrderFilters />
        <OrdersTable count={paginatedOrders.length} page={page} rows={paginatedOrders} rowsPerPage={rowsPerPage} />
      </Stack>
    </DashboardLayout>
  )
}

export default OrdersOverview

function applyPagination(rows, page, rowsPerPage) {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}
