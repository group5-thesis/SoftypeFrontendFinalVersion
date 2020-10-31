import React from 'react'

const Toaster = React.lazy(() => import('modules/notifications/toaster/Toaster'))
const Tables = React.lazy(() => import('modules/base/tables/Tables'))

const Breadcrumbs = React.lazy(() => import('modules/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('modules/base/cards/Cards'))
const Carousels = React.lazy(() => import('modules/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('modules/base/collapses/Collapses'))
const BasicForms = React.lazy(() => import('modules/base/forms/BasicForms'))

const Jumbotrons = React.lazy(() => import('modules/base/jumbotrons/Jumbotrons'))
const ListGroups = React.lazy(() => import('modules/base/list-groups/ListGroups'))
const Navbars = React.lazy(() => import('modules/base/navbars/Navbars'))
const Navs = React.lazy(() => import('modules/base/navs/Navs'))
const Paginations = React.lazy(() => import('modules/base/paginations/Pagnations'))
const Popovers = React.lazy(() => import('modules/base/popovers/Popovers'))
const ProgressBar = React.lazy(() => import('modules/base/progress-bar/ProgressBar'))
const Switches = React.lazy(() => import('modules/base/switches/Switches'))

const Tabs = React.lazy(() => import('modules/base/tabs/Tabs'))
const Tooltips = React.lazy(() => import('modules/base/tooltips/Tooltips'))
const BrandButtons = React.lazy(() => import('modules/buttons/brand-buttons/BrandButtons'))
const ButtonDropdowns = React.lazy(() => import('modules/buttons/button-dropdowns/ButtonDropdowns'))
const ButtonGroups = React.lazy(() => import('modules/buttons/button-groups/ButtonGroups'))
const Buttons = React.lazy(() => import('modules/buttons/buttons/Buttons'))
const Charts = React.lazy(() => import('modules/charts/Charts'))
const Dashboard = React.lazy(() => import('modules/dashboard/Dashboard'))
const CoreUIIcons = React.lazy(() => import('modules/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('modules/icons/flags/Flags'))
const Brands = React.lazy(() => import('modules/icons/brands/Brands'))
const Alerts = React.lazy(() => import('modules/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('modules/notifications/badges/Badges'))
const Modals = React.lazy(() => import('modules/notifications/modals/Modals'))
const Colors = React.lazy(() => import('modules/theme/colors/Colors'))
const Typography = React.lazy(() => import('modules/theme/typography/Typography'))
const Widgets = React.lazy(() => import('modules/widgets/Widgets'))
const Users = React.lazy(() => import('modules/users/Users'))
const User = React.lazy(() => import('modules/users/User'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
]

export default routes
