import React from 'react';
import Select from 'react-select';
import {
  func, bool, object
} from 'prop-types';
import Modal from '../../../common/Modal';

/**
 * @description AddMenuTemplate Component
 *
 * @func AddMenuTemplate
 *
 *  @param {object} props
 *
 * @returns {JSX}
 */
const AddMenuTemplate = (props) => {
  const {
    closeModal,
    displayModal,
    handleSubmit,
    handleChange,
    handleSelect,
    errors,
    isLoading
  } = props;
  const mealPeriod = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },

  ];

  /**
     * Renders modal conten
     * @returns {JSX}
     */
  const renderContent = () => (
    <div className="children">
      <label htmlFor="title">
          Title
        <span className="form-error">{errors && errors.title}</span>
      </label>
      <input
        className="input"
        type="text"
        name="title"
        placeholder="Enter template title"
        onChange={handleChange}
      />
      <label htmlFor="description">
          Description
        <span className="form-error">{errors && errors.description}</span>
      </label>
      <textarea
        type="text"
        name="description"
        placeholder="Enter template description..."
        onChange={handleChange}
      />
      <label htmlFor="meal-period">
          Meal Period
        <span className="form-error"> {errors && errors.mealPeriod}</span>
      </label>
      <Select
        onChange={handleSelect}
        name="meal-period"
        options={mealPeriod}
        isClearable
        placeholder="Select location"
      />
    </div>
  );

  return (
    <React.Fragment>
      <div className="add-menu-template">
        <Modal
          closeModal={closeModal}
          formValidation={handleSubmit}
          displayModal={displayModal}
          modalButtonText="ADD"
          modalTitle="Add Menu Template"
          loading={isLoading}
        >
          {renderContent()}
        </Modal>
      </div>
    </React.Fragment>
  );
};

AddMenuTemplate.propTypes = {
  closeModal: func.isRequired,
  displayModal: bool.isRequired,
  handleSubmit: func.isRequired,
  handleChange: func.isRequired,
  handleSelect: func.isRequired,
  errors: object.isRequired,
  isLoading: bool.isRequired
};

export default AddMenuTemplate;
