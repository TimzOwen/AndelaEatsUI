/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import {
  func, shape, string, array, bool, date, object
} from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Loader from '../../common/Loader/Loader';
import inputValidation from '../../../helpers/inputValidation';
import formatDropdown from '../../../helpers/formatDropdown';
import formatMealItems, {
  getIds, formatDate
} from '../../../helpers/formatMealItems';
import { adminAllowed } from '../../../tests/__mocks__/mockMenuItems';

/**
 *
 * @class MenuModal
 * @extends Component
 */
class MenuModal extends Component {
  static initialState = () => ({
    protein: [],
    sideMeal: [],
    mainItem: '',
    allowedSideMeal: '',
    allowedProtein: '',
    vendorEngagementId: '',
    errors: {},
    collectionDate: moment()
  });

  constructor(props) {
    super(props);

    this.state = MenuModal.initialState();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.menu) !== JSON.stringify(this.props.menu)) {
      const {
        allowedProtein, allowedSide: allowedSideMeal, vendorEngagementId,
        date: collectionDate, mainMeal: mainItem, proteinItems: protein,
        sideItems: sideMeal,
      } = nextProps.menu;
      const vendor = nextProps.vendorEngagements
        .filter(ven => ven.id === vendorEngagementId);
      const engagement = vendor.length ? formatDropdown(vendor)[0] : '';
      const formatedMealItems = (protein && sideMeal)
        ? formatMealItems([...protein, ...sideMeal])
        : { protein: [], side: [] };

      this.setState({
        allowedProtein: allowedProtein
          ? { value: allowedProtein, label: allowedProtein } : '',
        allowedSideMeal: allowedSideMeal
          ? { value: allowedSideMeal, label: allowedSideMeal } : '',
        mainItem: mainItem ? { label: mainItem.name, value: mainItem.id } : '',
        protein: formatedMealItems.protein,
        sideMeal: formatedMealItems.side,
        vendorEngagementId: engagement,
        collectionDate: moment(collectionDate),
      });
    }
  }

  /**
   *
   * @method onChange
   *
   * @memberOf MenuModal
   *
   * @param {object} selectOption
   * @param {object} name
   *
   * @returns {void}
   */
  onChange = (selectOption, name) => {
    const { errors } = this.state;
    if (Object.entries(errors).length > 0) {
      this.setState({ errors: {} });
    }

    this.setState({
      [name]: selectOption
    });
  };

  /**
   *
   * @method checkAllowedSelection
   *
   * @memberOf MenuModal
   *
   * @returns {void}
   */
  checkAllowedSelection = () => {
    const check = {};
    const {
      sideMeal,
      allowedSideMeal,
      protein,
      allowedProtein,
      mainItem,
      collectionDate,
      vendorEngagementId
    } = this.state;

    if (sideMeal.length < allowedSideMeal.value) {
      this.setState({
        errors: {
          sideMeal: 'Side meals should not be less than Allowed Side Meal'
        }
      });

      return;
    }

    if (protein.length < allowedProtein.value) {
      this.setState({
        errors: {
          protein: 'Proteins not be less than Allowed Protein'
        }
      });

      return;
    }

    if (Object.keys(check).length !== 0) {
      this.setState({ errors: check });
    } else {
      this.props.handleSubmit({
        date: formatDate(collectionDate),
        mealPeriod: "Lunch",
        mainMealId: mainItem.value,
        allowedSide: allowedSideMeal.value,
        allowedProtein: allowedProtein.value,
        sideItems: getIds(sideMeal),
        proteinItems: getIds(protein),
        vendorEngagementId: vendorEngagementId.value
      });
    }
  }

  /**
   *
   * @method formValidation
   *
   * @memberOf MenuModal
   *
   * @param {object} event
   *
   * @returns {void}
   */
  formValidation = (event) => {
    event.preventDefault();
    const err = inputValidation(this.state);
    if (err.isEmpty) {
      this.checkAllowedSelection();
    } else {
      this.setState({ errors: err.errors });
    }
  };

  /**
   *
   * @method handleCloseModal
   *
   * @memberOf MenuModal
   *
   * @returns {Void}
   */
  handleCloseModal = () => {
    this.setState(MenuModal.initialState());
    this.props.closeModal();
  };

  render() {
    const {
      modalTitle,
      modalButtonText,
      displayModal,
      vendorEngagements,
      mealItems,
      isCreating
    } = this.props;
    const {
      sideMeal,
      mainItem,
      protein,
      vendorEngagementId,
      allowedSideMeal,
      allowedProtein,
      collectionDate,
      errors
    } = this.state;

    const engagements = formatDropdown(vendorEngagements);
    const formatedMealItems = formatMealItems(mealItems);
    return (
      <Fragment>
        <div
          className="modal"
          id="menu-modal"
          style={displayModal ? { display: 'block' } : { display: 'none' }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="header-title">{modalTitle}</div>
              <div>
                <button
                  type="button"
                  tabIndex={0}
                  className="close-icon btn-no-style"
                  onClick={this.handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
            <form onSubmit={this.formValidation}>
              <div>
                <div className="form-field-single">
                  <label htmlFor="soup">Vendor Engagements&nbsp;
                    <span>
                      {errors.vendorEngagementId
                        ? errors.vendorEngagementId : ""
                      }
                    </span>
                  </label>
                  <Select
                    onChange={(e) => this.onChange(e, 'vendorEngagementId')}
                    isSearchable
                    value={vendorEngagementId}
                    options={engagements}
                    placeholder="select vendor"
                  />
                </div>
                <div className="form-field-double">
                  <div className="select-width">
                    <label htmlFor="menuItem">Main Item&nbsp;
                      <span>
                        {errors.mainItem ? errors.mainItem : ""}
                      </span>
                    </label>
                    <Select
                      onChange={(e) => this.onChange(e, 'mainItem')}
                      name="mainItem"
                      id="mainItem"
                      value={mainItem}
                      options={formatedMealItems.main}
                      isClearable
                      placeholder="select main meal"
                    />
                  </div>
                  <div className="select-width date-input">
                    <label htmlFor="date">Collection Date&nbsp;
                      <span>
                        {errors.date ? errors.date : ""}
                      </span>
                    </label>
                    <DatePicker
                      selected={collectionDate}
                      minDate={moment()}
                      onChange={(e) => this.onChange(e, 'collectionDate')}
                    />
                  </div>
                </div>
                <div className="form-field-double">
                  <div className="select-width">
                    <label htmlFor="Protien">Allowed side meal&nbsp;
                      <span>
                        {errors.allowedSideMeal ? errors.allowedSideMeal : ""}
                      </span>
                    </label>
                    <Select
                      onChange={(e) => this.onChange(e, "allowedSideMeal")}
                      name="allowedSideMeal"
                      value={allowedSideMeal}
                      options={adminAllowed}
                      isClearable
                      placeholder="select"
                    />
                  </div>
                  <div className="select-width">
                    <label htmlFor="side">Allowed protein&nbsp;
                      <span>
                        {errors.allowedProtein ? errors.allowedProtein : ""}
                      </span>
                    </label>
                    <Select
                      onChange={(e) => this.onChange(e, "allowedProtein")}
                      name="allowedProtein"
                      value={allowedProtein}
                      options={adminAllowed}
                      isClearable
                      placeholder="select"
                    />
                  </div>
                </div>
                <div className="form-field-single">
                  <label htmlFor="soup">Side meal&nbsp;
                    <span className="errors">
                      {errors.sideMeal ? errors.sideMeal : ""}
                    </span>
                  </label>
                  <Select
                    onChange={(e) => this.onChange(e, 'sideMeal')}
                    isMulti
                    value={sideMeal}
                    options={formatedMealItems.side}
                    placeholder="select side meal"
                  />
                </div>
                <div className="form-field-single">
                  <label htmlFor="Protien">Protein&nbsp;
                    <span className="errors">
                      {errors.protein ? errors.protein : ""}
                    </span>
                  </label>
                  <Select
                    onChange={(e) => this.onChange(e, 'protein')}
                    isMulti
                    name="protein"
                    value={protein}
                    options={formatedMealItems.protein}
                    placeholder="select protein"
                  />
                </div>
                <div className="modal-footer">
                  { isCreating
                    ? <div className="modal-loader"><Loader /></div>
                    : (
                      <div className="button-container">
                        <button
                          type="button"
                          className="grayed"
                          onClick={this.handleCloseModal}
                        >
                        Cancel
                        </button>
                        <button
                          type="submit"
                        >
                          {modalButtonText}
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

MenuModal.propTypes = {
  closeModal: func,
  modalTitle: string,
  modalButtonText: string,
  displayModal: bool,
  isCreating: bool,
  handleSubmit: func,
  vendorEngagements: array,
  mealItems: array,
  menu: object,
};

export default MenuModal;
