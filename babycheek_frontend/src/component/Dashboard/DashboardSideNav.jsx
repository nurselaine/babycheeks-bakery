'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { paths } from './constant'
import { isNavItemActive } from './../../utils/utils'
import { NavItems } from './DashboardConfig'
import { NavIcons } from './NavIcons'
import { useLocation, Link } from 'react-router-dom'

export function SideNav() {
  const pathname = useLocation().pathname

  return (
    <Box
      sx={{
        '--SideNav-background': '#1e1650',
        '--SideNav-color': '#ffffff',
        '--NavItem-color': '#b3b9c6',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': '#635bff',
        '--NavItem-active-color': '#ffffff',
        '--NavItem-disabled-color': '#667085',
        '--NavItem-icon-color': '#8a94a6',
        '--NavItem-icon-active-color': '#ffffff',
        '--NavItem-icon-disabled-color': '#565e73',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' }
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box href={paths.home} sx={{ display: 'inline-flex' }}>
          <Link to='/' className='nav-container'>
            <img src='/assets/bbb_logo.png' alt='bakery_logo' className='logo nav-icon' />
            <p
              style={{
                color: '#ffffff'
              }}
              className='logoname'
            >
              Babycheeks Bakery
            </p>
          </Link>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#434a60' }} />
      <Box component='nav' sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: NavItems })}
      </Box>
    </Box>
  )
}

function renderNavItems({ items = [], pathname }) {
  const children = items.reduce((acc, curr) => {
    const { key, ...item } = curr
    acc.push(<NavItem key={key} pathname={pathname} {...item} />)

    return acc
  }, [])

  return (
    <Stack component='ul' spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  )
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }) {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname })
  const Icon = icon ? NavIcons[icon] : null
  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? 'a' : Link,
              href: external ? href : undefined,
              to: external ? undefined : href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed'
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' })
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? (
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize='var(--icon-fontSize-md)'
              weight={active ? 'fill' : undefined}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography component='span' sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}>
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  )
}
