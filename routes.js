/*!

=========================================================
* * NextJS Material Dashboard v1.0.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Notifications from '@material-ui/icons/Notifications';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,

    layout: '/admin',
  },
  {
    path: '/admin-profile',
    name: 'Admin Profile',
    icon: Person,

    layout: '/admin',
  },
  {
    path: '/admin-management',
    name: 'Admin Management',
    icon: SupervisorAccountIcon,

    layout: '/admin',
  },
  {
    path: '/blacklist',
    name: 'Blacklist Management',
    icon: MoodBadIcon,

    layout: '/admin',
  },
  {
    path: '/table-list',
    name: 'Table List',
    icon: 'content_paste',

    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,

    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,

    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,

    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,

    layout: '/admin',
  },
];

export default dashboardRoutes;
