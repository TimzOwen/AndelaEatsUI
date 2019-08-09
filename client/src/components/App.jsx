/* eslint-disable import/no-named-as-default */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNav from './common/Sidenav/Sidenav';
import Login from './Login/Login';
import Orders from './Order/Orders';
import OrderHistory from './OrderHistory/OrderHistory';
import EditOrder from './EditOrder/EditOrder';
import AdminOrderHistory from './Admin/OrderHistory/Index';
import ExportOrders from './Admin/OrderHistory/ExportOrders';
import Meals from './Admin/Meals/Index';
import MealSessions from './Admin/Meals/Sessions';
import Engagements from './Admin/Engagements/Index';
import Ratings from './Admin/Ratings/Index';
import Dashboard from './Dashboard/Dashboard';
import About from './About/About';
import Faqs from './Faqs/Faqs';
import Menus from './Admin/Menus/Index';
import Vendors from './Admin/Vendors/Vendors';
import SuspendedVendor from './Admin/SuspendedVendors/Index';
import UserTabs from './Admin/Tabs/Users';
import MenuTemplate from './Admin/Menus/MenuTemplate';

export const NotFound = () => <h1>Page Not Found</h1>;

/**
 * !Todo
 * <ToastContainer /> should be declared here
 * there are too many instances of it.
 * just below <SideNav /> would be a good place to declare it.
 */

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <SideNav>
        <Switch>
          <Route path="/ordermeal" component={Orders} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/orders" component={OrderHistory} />
          <Route exact path="/about" component={About} />
          <Route exact path="/faqs" component={Faqs} />
          <Route exact path="/orders/edit/:id" component={EditOrder} />
          <Route exact path="/admin/orders" component={AdminOrderHistory} />
          <Route exact path="/admin/orders/export" component={ExportOrders} />
          <Route exact path="/admin/vendors" component={Vendors} />
          <Route
            exact
            path="/admin/suspended-vendors"
            component={SuspendedVendor}
          />
          <Route exact path="/admin/menus" component={Menus} />
          <Route exact path="/admin/meals" component={Meals} />
          <Route exact path="/admin/sessions" component={MealSessions} />
          <Route exact path="/admin/engagements" component={Engagements} />
          <Route exact path="/admin/ratings" component={Ratings} />
          <Route exact path="/admin/users" component={UserTabs} />
          <Route exact path="/admin/menu-templates" component={MenuTemplate} />
          <Route component={NotFound} />
        </Switch>
      </SideNav>
    </Switch>
  </Router>
);

export default Root;
