import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt'
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown'
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp'
export const TotalSales = ({ diff, trend, sx, value }) => {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon
  const trendColor = trend === 'up' ? '#15b79f' : '#f04438'

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction='row' sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              Total Sales
            </Typography>
            <Typography variant='h4'>${value.toFixed(2)}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: '#635bff', height: '56px', width: '56px' }}>
            <ReceiptIcon fontSize='1.5rem' />
          </Avatar>
        </Stack>{' '}
        {diff ? (
          <Stack sx={{ alignItems: 'center', marginTop: '1em' }} direction='row' spacing={2}>
            <Stack sx={{ alignItems: 'center' }} direction='row' spacing={0.5}>
              <TrendIcon color={trendColor} fontSize='1.25rem' />
              <Typography color={trendColor} variant='body2'>
                {diff}%
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='caption'>
              Since last month
            </Typography>
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  )
}
