import { combineReducers } from 'redux';

import faqsReducer from './faqsReducer';
import userReducer from './userReducer';
import ordersReducer from './ordersReducer';
import menuReducer from './menuReducer';
import vendorsReducer from './vendorsReducer';
import mealOrdersReducer from './admin/ordersReducer';
import mealItemsReducer from './admin/mealItemsReducer';
import adminMenusReducer from './admin/menusReducer';
import engagementsReducer from './admin/engagementsReducer';
import suspendedVendorReducer from './admin/suspendedVendorReducer';
import adminUserReducer from './admin/adminUserReducer';
import mealRatingsReducer from './admin/ratingsReducer';
import dashBoardReducer from './dashboardReducer';
import mealSessionsReducer from './admin/mealSessionsReducer';
import aboutReducer from './aboutReducer';
import tappedUserReducer from './admin/tappedUsersReducer';
import usersReducer from './admin/usersReducer';

export default combineReducers({
  userReducer,
  upcomingMenus: menuReducer,
  orders: ordersReducer,
  allVendors: vendorsReducer,
  mealOrders: mealOrdersReducer,
  mealItems: mealItemsReducer,
  mealSessions: mealSessionsReducer,
  menus: adminMenusReducer,
  allEngagements: engagementsReducer,
  suspendVendors: suspendedVendorReducer,
  user: adminUserReducer,
  users: usersReducer,
  allRatings: mealRatingsReducer,
  faqsReducer,
  aboutReducer,
  vendorPerformance: dashBoardReducer,
  tappedUserReducer
});
