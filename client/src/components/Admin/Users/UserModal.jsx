import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal';
import Input from '../../common/FormInputs';
import SelectBox from '../../common/SelectBox/SelectBox';
import ImageView from '../../common/ImageView/ImageView';

const userModal = (
  { 
    showModal, hideModal, loading, user, onChange, handleSubmit, errors, 
    roles, openFileDialog, image, handleUpload, getImageRef, imageLoading 
  }) => {
  const options = roles
    .map(option => ({ value: option, name: option.name.toUpperCase(), id: option.id }));
  const role = roles
    .find(item => item.id === (user.roleId ? Number(user.roleId) : user.userRoles[0].id));

  const imageInput = getImageRef();
  return (
    <Fragment>
      <Modal 
        displayModal={showModal} 
        closeModal={hideModal} 
        formValidation={handleSubmit} 
        content={user}
        loading={loading || imageLoading}
        modalButtonText={!user.id ? 'ADD USER' : 'UPDATE USER'}
        modalTitle={!user.id ? 'Add User' : 'Edit User'}
      >
        <main>
          <div className="user-image">
            <input
              type="file"
              style={{ display: 'none' }}
              ref={imageInput}
              onChange={handleUpload}
            />
            <div>
              Upload meal thumbnail. &nbsp;
              <a role="button" onClick={openFileDialog}>
               Select from computer
              </a>
            </div>
          </div>
          <ImageView 
            error={image.error}
            dataurl={image.dataurl || user.imageUrl}
            openFileDialog={openFileDialog}
          />
          <Input
            id="firstName"
            name="firstName"
            value={user && user.firstName}
            onChangeHandler={onChange}
            error={errors && errors.firstName}
            label="First Name"
            type="text"
          />
          <Input
            id="lastName"
            name="lastName"
            value={user && user.lastName}
            onChangeHandler={onChange}
            error={errors && errors.lastName}
            label="Last Name"
            type="text"
          />
        
          <div className="form-field-set">
            <SelectBox 
              label="Role" 
              options={options} 
              value={role && role.id}
              onChange={onChange}
              type="roleId"
            />
          </div>
        </main>
      </Modal>
    </Fragment>
  );
};


userModal.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  hideModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  openFileDialog: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  getImageRef: PropTypes.func.isRequired,
  imageLoading: PropTypes.bool,
  image: PropTypes.object,
};
export default userModal;
