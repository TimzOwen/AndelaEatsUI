import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import Loader from "./Loader/Loader";
import Button from './Button/Button';

const Modal = ({
  closeModal,
  formValidation,
  displayModal,
  modalButtonText,
  children,
  modalTitle,
  editTitle,
  loading,
}) => (
  <div
    className="modal"
    id="add-modal"
    style={displayModal ? { display: 'block' } : { display: 'none' }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <div className="header-title">{modalTitle} &nbsp;{editTitle}</div>
        <Fragment>
          <Button
            tabIndex={0}
            classes="close-icon btn-no-style"
            onClickHandler={closeModal}
            btnText="X&nbsp;&nbsp;Close"
            loading={loading}
          />
        </Fragment>
      </div>
      <form onSubmit={formValidation}>
        <Fragment>
          {loading && <Loader /> } 
          {children}
          <div className="modal-footer">
            <div className="button-container">
              <Button
                type="button"
                classes="grayed"
                onClickHandler={closeModal}
                btnText="Cancel"
              />
              <Button
                btnText={modalButtonText}
                loading={loading}
                onClickHandler={formValidation}
              /> 
            </div>
          </div>
        </Fragment>
      </form>
    </div>
  </div>
);

Modal.propTypes = {
  displayModal: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  formValidation: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  modalButtonText: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  editTitle: '',
};

export default Modal;
