'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2'
import { useGetUserInfo } from '../../../hooks/useGetUserInfo'

const states = [
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'washington', label: 'Washington' }
]

export function AccountDetailForm() {
  const user = useGetUserInfo()
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <Card>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput defaultValue={user.firstName} label='First name' name='firstName' />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput defaultValue={user.lastName} label='Last name' name='lastName' />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue={user.email ?? undefined} label='Email address' name='email' />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput defaultValue={user.phoneNumber ?? undefined} label='Phone number' name='phone' type='tel' />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select label='State' name='state' variant='outlined'>
                  {states.map((option) => {
                    return (
                      <MenuItem selected={option.label === user.state} key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput defaultValue={user.city} label='City' />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            sx={{
              backgroundColor: '#635bff'
            }}
            variant='contained'
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
