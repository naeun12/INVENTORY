import { createRouter, createWebHistory } from 'vue-router'
import Login from '../../views/accountManagement/Login.vue'
import Dashboard from '../../views/auth/dashboard.vue'
import StockManagement from '../../views/auth/InventoryManagement.vue'
import Issuances from '../../views/auth/issuances.vue'
import Delivery from '../../views/auth/delivery.vue'
import DepartmentManagement from '../../views/auth/departmentManagement.vue'
import NationalofficeManagement from '../../views/auth/nationalofficeManagement.vue'
import BarangayManagement from '../../views/auth/barangayManagement.vue'
import SchoolManagement from '../../views/auth/schoolManagement.vue'
import AccountSettings from '../../views/auth/accountSettings.vue'
import MyProfile from '../../views/auth/myProfile.vue'
import Notifications from '../../views/auth/notifications.vue'

import CreatenewAccount from '../../views/auth/createnewAccount.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/stock-management',
    name: 'StockManagement',
    component: StockManagement,
  },
  {
    path: '/issuances',
    name: 'Issuances',
    component: Issuances,
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: Delivery,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
  },
  {
    path: '/create-new-account',
    name: 'CreatenewAccount',
    component: CreatenewAccount,
  },
  {
    path: '/department-management',
    name: 'departmentManagement',
    component: DepartmentManagement,
  },
  {
    path: '/nationaloffice-management',
    name: 'nationalofficeManagement',
    component: NationalofficeManagement,
  },
  {
    path: '/barangay-management',
    name: 'barangayManagement',
    component: BarangayManagement,
  },
  {
    path: '/school-management',
    name: 'schoolManagement',
    component: SchoolManagement,
  },
  {
    path: '/account-settings',
    name: 'AccountSettings',
    component: AccountSettings,
  },
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
