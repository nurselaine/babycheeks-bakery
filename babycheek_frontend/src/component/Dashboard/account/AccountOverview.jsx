import React, { useEffect, useState } from 'react'
import DashboardLayout from '../DashboardLayout'
import { AccountInfo } from './AccountInfo'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import { AccountDetailForm } from './AccountDetailForm'

const AccountOverview = () => {
  return (
    <DashboardLayout>
      <Stack spacing={3}>
        <div>
          <Typography variant='h4'>Account</Typography>
        </div>
        <Grid container spacing={3}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo />
          </Grid>
          <Grid lg={8} md={6} xs={12}>
            <AccountDetailForm />
          </Grid>
        </Grid>
      </Stack>
    </DashboardLayout>
  )
}

export default AccountOverview
