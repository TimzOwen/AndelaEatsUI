import React from 'react';
import {
  func, object, bool, shape
} from 'prop-types';

/**
 * @function RevokeAdminModal
 *
 * @param {object} adminUser
 *
 * @returns {JSX}
 */
const RevokeAdminModal = ({
  display, closeModal, adminUser, revokeAdmin
}) => (
  <div
    className="modal"
    id="delete-menu-modal"
    style={(display) ? { display: 'block' } : { display: 'none' }}
  >
    { display 
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">Revoke Admin</div>
          </div>
          <h3>Permanently Revoke {adminUser.name}</h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <button 
              id="close-revokeModal"
              className="grayed upper" 
              type="button"
              onClick={closeModal}
            >
            Cancel
            </button>
            <button
              className="fill upper"
              id="revoke-admin" 
              type="button" 
              tabIndex={0}
              onClick={() => revokeAdmin(adminUser.user_role_id)}
            >
            Delete
            </button>
          </div>
        </div>
      )
      : null
   }
  </div>
);

RevokeAdminModal.propTypes = {
  display: bool.isRequired,
  closeModal: func.isRequired,
  adminUser: object.isRequired,
  revokeAdmin: func.isRequired
};

export default RevokeAdminModal;
