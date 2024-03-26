import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download'
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus'
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload'
import dayjs from 'dayjs'

import { CustomersFilters } from './CustomersFilter'
import { CustomersTable } from './CustomersTable'
import DashboardLayout from './../DashboardLayout'
import { useGetOrders } from '../../../hooks/useGetOrders'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderData } from '../../../Redux/actions/dashboardActions'

export const metadata = { title: `Customers | Dashboard` }

const customers = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    email: 'alcides.antonio@devias.io',
    phone: '908-691-3242',
    address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    createdAt: dayjs().subtract(2, 'hours').toDate()
  }
]

const CustomerOverview = () => {
  const dispatch = useDispatch();
  const page = 0
  const rowsPerPage = 10
  // const [customerInfo, setCustomerInfo] = useState([])
  const customerInfo = useSelector((state) => state.dashboard.customers);

  useEffect(() => {
    dispatch(fetchOrderData());
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const orders = await useGetOrders()
  //       const customers = orders.map((order) => {
  //         return {
  //           id: order.id,
  //           firstName: order.firstname,
  //           lastName: order.lastname,
  //           orderDate: order.order_date
  //         }
  //       })

  //       setCustomerInfo(customers)
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  const paginatedCustomers = applyPagination(customerInfo, page, rowsPerPage)
  return (
    <DashboardLayout>
      <Stack spacing={3}>
        <Stack direction='row' spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant='h4'>Customers</Typography>
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
        <CustomersFilters />
        <CustomersTable count={paginatedCustomers.length} page={page} rows={paginatedCustomers} rowsPerPage={rowsPerPage} />
      </Stack>
    </DashboardLayout>
  )
}

export default CustomerOverview

function applyPagination(rows, page, rowsPerPage) {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
}
