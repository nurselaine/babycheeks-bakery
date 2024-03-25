import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import GlobalStyles from '@mui/material/GlobalStyles'

import { AuthGuard } from '../auth/AuthGaurd'
import { SideNav } from './DashboardSideNav'
import { MainNav } from './DashboardMainNav'
// import SideNav from './DashboardSideNav'
import './DashboardLayout.css'
// import { MobileNav } from './mobile-nav'
// import { UserPopover } from './user-popover'

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100
          }
        }}
      />
      <Box
        sx={{
          bgcolor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%'
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav />
          <main>
            <Container maxWidth='xl' sx={{ py: '64px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </AuthGuard>
  )
}
