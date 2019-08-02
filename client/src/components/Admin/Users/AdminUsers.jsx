/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader/Loader';
import RevokeAdminModal from './RevokeAdminModal';

// Actions
import {
  createAdminUser, 
  getAllAdminUsers,
  revokeAdmin
} from '../../../actions/admin/adminUserAction';
import EmptyContent from "../../common/EmptyContent";


/**
 *
 *
 *
 * @class Users
 * @extends {Component}
 */
export class Users extends Component {
  state = {
    emailAddress: '',
    displayRevokeModal: false,
  };

  componentDidMount() {
    this.props.getAllAdminUsers();
  }

  /**
   *
   * @param {event} event
   *
   * @returns {void}
   * @memberOf Users
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { emailAddress } = this.state;
    const emailData = emailAddress.trim();
    const userData = {
      emailAddress: emailData,
      roleId: 1
    };
    this.props.createAdminUser(userData)
      .then(() => { this.setState({ emailAddress: '', }); });
  }

  /**
   *
   * @param {e} e
   *
   * @returns {void}
   * @memberOf Users
   */
  onChange = (e) => {
    const { value } = e.target;
    this.setState({ emailAddress: value });
  };
    
  /** 
   * @method showRevokeModal
   *
   * @memberOf adminUser
   *
   *@param {object} adminUser
   *
   * @returns {void}
   */
  showRevokeModal = (adminUser) => {
    this.setState({
      displayRevokeModal: true,
      adminUser
    });
  };

  /**
   *
   * @method closeRevokeModal
   *
   * @memberOf Menus
   *
   *
   * @returns {void}
   */
  closeRevokeModal = () => {
    this.setState({
      displayRevokeModal: false,
    });
  };

  /**
   *
   * @method revokeAdmin
   *
   * @param {number} userRoleId
   *
   * @memberOf Menu
   *
   * @returns {void}
   */
  revokeAdmin = (userRoleId) => {
    this.props.revokeAdmin(userRoleId);
    this.setState({
      displayRevokeModal: false,
    });
  };

  render() {
    const { adminUsers, loading } = this.props;
    const { displayRevokeModal, adminUser, emailAddress } = this.state;
    return (
      <div>
        <div>
          <span className="heading-style">Assign Admin role to a user</span>
          <form className="parent-div" onSubmit={this.handleSubmit}>
            <label htmlFor="userEmail">Email</label>
            <input
              id="userEmail"
              className="user-form"
              name="emailAddress"
              onChange={this.onChange}
              value={emailAddress}
            />
            <button type="submit" className="assign-role button-right">
            Assign Admin Role
            </button>
          </form><br /><br />
          <span className="heading-style">List of Admin Users</span><br /><br />
          {
          loading && (
            <Loader />
          )
        }


          {
          adminUsers.length > 0 && (
            <div className="table-header custom-row">
              <div className="custom-col-5">Name</div>
              <div className="custom-col-5">Email</div>
              <div className="custom-col-2">Options</div>
            </div>
          )
        }

          {
          adminUsers.length > 0 && (
            adminUsers.map((user) => (
              <div key={user.email} className="table-body">
                <div className="table-row">
                  <div className="custom-row">
                    <div className="custom-col-5">{user.name}</div>
                    <div className="custom-col-5">{user.email}</div>
                    <div className="custom-col-2">
                      <span
                        className="delete-color"
                        id="delete-admin"
                        role="menuitem"
                        tabIndex="0" 
                        onClick={() => this.showRevokeModal(user)}
                      >Revoke
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )))
        }
          {!loading && adminUsers.length === 0 && <EmptyContent message="No Admin Found" />}
          <ToastContainer />
        </div>
        { displayRevokeModal && (
        <RevokeAdminModal
          display={displayRevokeModal}
          deleteMenu={this.deleteMenu}
          closeModal={this.closeRevokeModal}
          adminUser={adminUser}
          revokeAdmin={this.revokeAdmin}
        />
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  userEmail: state.user.email,
  adminUsers: state.user.adminUsers,
  loading: state.user.isloading
});

Users.propTypes = {
  createAdminUser: PropTypes.func.isRequired,
  getAllAdminUsers: PropTypes.func.isRequired,
  adminUsers: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  revokeAdmin: PropTypes.func.isRequired,
};

Users.defaultProps = {
  loading: false,
};

export default
connect(mapStateToProps, { createAdminUser, getAllAdminUsers, revokeAdmin })(Users);
