import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import {
  DASHBOARD_ROUTE,
  QUOTES_ROUTE,
  ORDERS_ROUTE,
  USERS_ROUTE,
  INVOICES_ROUTE,
  ACCOUNT_SETTINGS_ROUTE
} from 'constants/index';

export const routes = [
  {
    label: 'Dashboard',
    icon: DashboardTwoToneIcon,
    to: DASHBOARD_ROUTE
  },
  {
    label: 'Quotes',
    icon: AssignmentOutlinedIcon,
    to: QUOTES_ROUTE
  },
  {
    label: 'Orders',
    icon: LibraryBooksOutlinedIcon,
    to: ORDERS_ROUTE
  },
  {
    label: 'Users',
    icon: GroupIcon,
    to: USERS_ROUTE
  },
  {
    label: 'Invoices',
    icon: DescriptionOutlinedIcon,
    to: INVOICES_ROUTE
  },
  {
    label: 'Account Status',
    icon: SettingsIcon,
    to: ACCOUNT_SETTINGS_ROUTE
  }
];
