import React, { Component } from 'react';
import AddMenuTemplate from './AddMenuTemplate';
import inputValidation from '../../../../helpers/inputValidation';
import Button from '../../../common/Button/Button';

/**
 *
 * @description MenuTemplate Component
 *
 * @class MenuTemplate
 * @extends Component
 */
export class MenuTemplate extends Component {
  state={
    displayModal: false,
    title: '',
    description: '',
    selectedOption: '',
    isLoading: false,
    errors: {}
  }

  /**
     * Handles closing a modal
     *
     * @returns {void}
     */
  closeModal= () => {
    this.setState({
      displayModal: false,
      errors: {}
    });
  }

  /**
     * Handles opening a modal
     *
     * @returns {void}
     */
   openModal= () => {
     this.setState({
       displayModal: true,
     });
   }

   /**
     * Handles change
     *
     * @param {object} event
     *
     * @returns {void}
     */
    handleChange = (event) => {
      const { value, name } = event.target;

      this.setState({ [name]: value });
    };

    /**
     * Handles select change hange
     *
     * @param {object} selectedOption
     *
     * @returns {void}
     */
    handleSelectedChange = selectedOption => {
      this.setState({ selectedOption });
    };

    /**
     * Handles form submission
     * @returns {void}
     */
    handleSubmit = () => {
      const {
        title,
        description,
        selectedOption
      } = this.state;
      const data = {
        title,
        description,
        mealPeriod: selectedOption && selectedOption.value
      };
      const err = inputValidation(data);

      if (!err.isEmpty) {
        this.setState({ errors: err.errors });
      }
    };

    render() {
      const { displayModal, errors, isLoading } = this.state;
      return (
        <React.Fragment>
          <div className="menu-template">
            <div className="header">
              <span className="heading"> Menu Templates </span>
              <Button
                classes="btn"
                onClickHandler={this.openModal}
                loading={isLoading}
                name="add-btn"
                btnText="Create"
              />
            </div>
            {displayModal
            && (
            <AddMenuTemplate
              closeModal={this.closeModal}
              displayModal={displayModal}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              handleSelect={this.handleSelectedChange}
              errors={errors}
              isLoading={isLoading}
            />
            )}
          </div>

        </React.Fragment>
      );
    }
}

export default MenuTemplate;
