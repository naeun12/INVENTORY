import { createRouter, createWebHistory } from 'vue-router'
import Login from '../../views/accountManagement/Login.vue'
import Dashboard from '../../views/auth/dashboard.vue'
import Issuances from '../../views/auth/issuances.vue'
import Logistic from '../../views/auth/logistic.vue'
import DepartmentManagement from '../../views/auth/departmentManagement.vue'
import NationalofficeManagement from '../../views/auth/nationalofficeManagement.vue'
import BarangayManagement from '../../views/auth/barangayManagement.vue'
import SchoolManagement from '../../views/auth/schoolManagement.vue'
import AccountSettings from '../../views/auth/accountSettings.vue'
import MyProfile from '../../views/auth/myProfile.vue'
import Notifications from '../../views/auth/notifications.vue'
import CreatenewAccount from '../../views/auth/createnewAccount.vue'
import ItemsManagement from '../../views/auth/itemsManagement.vue'
import Location from '../../views/auth/locations.vue'
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
    path: '/items-management',
    name: 'ItemsManagement',
    component: ItemsManagement,
  },
  {
    path: '/issuances',
    name: 'Issuances',
    component: Issuances,
  },
  {
    path: '/logistic',
    name: 'logistic',
    component: Logistic,
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
  {
    path: '/location',
    name: 'Location',
    component: Location,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
