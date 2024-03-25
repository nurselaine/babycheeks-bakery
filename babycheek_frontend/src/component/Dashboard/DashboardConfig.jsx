import { paths } from './constant'

export const NavItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'orders', title: 'Orders', href: paths.dashboard.orders, icon: 'orders' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' }
]
