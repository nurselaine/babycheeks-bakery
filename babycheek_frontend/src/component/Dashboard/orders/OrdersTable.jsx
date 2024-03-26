'use client'

import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { CheckSquare as CheckSquareIcon } from '@phosphor-icons/react/dist/ssr'
import { useSelection } from './../../../hooks/useSelection'
import { XSquare as XSquareIcon } from '@phosphor-icons/react/dist/ssr'
import { useOrderStatusUpdater } from '../../../hooks/useOrderStatusUpdater'
import { useDispatch } from 'react-redux'
import { updateOrderStatusRequest } from '../../../Redux/actions/dashboardActions'

function noop() {
  // do nothing
}

export function OrdersTable({ count = 0, rows = [], page = 0, rowsPerPage = 0 }) {
  const dispatch = useDispatch();
  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id)
  }, [rows])
  

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds)

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length
  const selectedAll = rows.length > 0 && selected?.size === rows.length

  const handleOrderStatus = (row) => {
    dispatch(updateOrderStatusRequest(row.id));
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll()
                    } else {
                      deselectAll()
                    }
                  }}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Fulfilled</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id)

              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id)
                        } else {
                          deselectOne(row.id)
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>

                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction='row' spacing={2}>
                      <Avatar src={row.avatar} />
                      <Typography variant='subtitle2'>
                        {row.firstname} {row.lastname}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell onClick={() => handleOrderStatus(row)}>{row.fulfilled === 1 ? <CheckSquareIcon color='#15b79f' /> : <XSquareIcon color='#f04438' />}</TableCell>
                  <TableCell>{dayjs(row.order_date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>${row.total}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component='div'
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  )
}
