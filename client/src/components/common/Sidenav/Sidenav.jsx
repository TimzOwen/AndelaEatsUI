/* eslint-disable import/no-named-as-default */

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import { isAuthorized, isAdmin } from '../../../helpers/authorization';

/**
 *
 *
 * @class SideNav
 * @extends {Component}
 */
class SideNav extends Component {
  state = {
    hideSubMenu: true,
    hideSubVendor: true,
  };

  checkAdmin = () => this.props.location.pathname.includes('admin');

  toggleSubMenu = () => {
    this.setState((prevState) => ({
      hideSubMenu: !prevState.hideSubMenu,
    }));
  };

  toggleSubVendor = () => {
    this.setState((prevState) => ({
      hideSubVendor: !prevState.hideSubVendor,
    }));
  };

  render() {
    const {
      children,
      location: { pathname },
    } = this.props;

    const homeActive = (section) => pathname.includes(`/${section}`);

    if (!isAuthorized()) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Navbar
          isAdmin={isAdmin()}
          adminDashboard={this.props.location.pathname.includes('admin')}
        />
        <div className="wrapper">
          <div className="side-nav">
            {!this.checkAdmin() && (
              <ul className="side-nav-item-wrapper">
                <Link to="/ordermeal">
                  <li
                    className={`side-nav-item home
                      ${homeActive('ordermeal') && 'active'}`}
                  >
                    <span>Home</span>
                  </li>
                </Link>
                <Link to="/orders">
                  <li className={`side-nav-item order
                    ${homeActive('orders') && 'active'}`}
                  >
                    <span>Orders</span>
                  </li>
                </Link>
                <Link to="/about">
                  <li
                    className={`side-nav-item about
                    ${homeActive('about') && 'active'}`}
                  >
                    <span>About</span>
                  </li>
                </Link>
                <Link to="/faqs">
                  <li
                    className={`side-nav-item faq
                    ${homeActive('faq') && 'active'}`}
                  >
                    <span>FAQs</span>
                  </li>
                </Link>
              </ul>
            )}
            {this.checkAdmin() && (
              <ul className="side-nav-item-wrapper">
                <Link to="/admin/dashboard">
                  <li
                    className={`side-nav-item dashboard
                  ${homeActive('dashboard') && 'active'}`}
                  >
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link to="/admin/orders">
                  <li
                    className={`side-nav-item order
                    ${homeActive('admin/orders') && 'active'}`}
                  >
                    <span>Orders</span>
                  </li>
                </Link>
                <li
                  className={`side-nav-item menus ${!this.state.hideSubMenu &&
                    'active'}`}
                  name="manage-menu"
                  onClick={this.toggleSubMenu}
                >
                  <span>Manage Menus</span>
                </li>
                <div hidden={this.state.hideSubMenu}>
                  <Link to="/admin/menus">
                    <li
                      className={`sub-menu-item  ${homeActive('admin/menus') &&
                        'active'}`}
                    >
                      <span>Menus</span>
                    </li>
                  </Link>
                  <Link to="/admin/meals">
                    <li
                      className={`sub-menu-item ${homeActive('admin/meals') &&
                        'active'}`}
                    >
                      <span>Meals</span>
                    </li>
                  </Link>
                  <Link to="/admin/sessions">
                    <li
                      className={`sub-menu-item ${homeActive(
                        'admin/sessions'
                      ) && 'active'}`}
                    >
                      <span>Meal Sessions</span>
                    </li>
                  </Link>
                  <Link to="/admin/menu-templates">
                    <li
                      className={`sub-menu-item ${homeActive(
                        'admin/menu-templates'
                      ) && 'active'}`}
                    >
                      <span>Menu Template</span>
                    </li>
                  </Link>
                </div>
                <li
                  className={`side-nav-item vendors ${!this.state
                    .hideSubVendor && 'active'}`}
                  name="vendor-manger"
                  onClick={this.toggleSubVendor}
                >
                  <span> Manage Vendors</span>
                </li>
                <div hidden={this.state.hideSubVendor}>
                  <Link to="/admin/vendors">
                    <li
                      className={`sub-menu-item  ${homeActive(
                        'admin/vendors'
                      ) && 'active'}`}
                    >
                      <span>Vendors</span>
                    </li>
                  </Link>
                  <Link to="/admin/engagements">
                    <li
                      className={`sub-menu-item ${homeActive(
                        'admin/engagements'
                      ) && 'active'}`}
                    >
                      <span>Engagements</span>
                    </li>
                  </Link>
                  <Link to="/admin/suspended-vendors">
                    <li
                      className={`sub-menu-item ${homeActive(
                        'admin/suspended-vendors'
                      ) && 'active'}`}
                    >
                      <span>Suspended Vendors</span>
                    </li>
                  </Link>
                </div>
                <Link to="/admin/ratings">
                  <li
                    className={`side-nav-item ratings
                    ${homeActive('admin/ratings') && 'active'}`}
                  >
                    <span>Ratings</span>
                  </li>
                </Link>
                <Link to="/admin/users">
                  <li
                    className={`side-nav-item users
                    ${homeActive('admin/users') && 'active'}`}
                  >
                    <span>Users</span>
                  </li>
                </Link>
              </ul>
            )}
          </div>
          <div className="main-container">
            <div className="section">{children}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SideNav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
};

SideNav.defaultProps = {
  location: {},
};

export default SideNav;
