import React, { Component, Fragment } from 'react';
import {
  func, shape, arrayOf, bool, any
} from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import MenuModal from './MenuModal';
import {
  fetchMenus,
  fetchVendorEngagements,
  mockMenu,
  deleteMenuItem,
  fetchMealItems,
  createMenu,
  editMenu,
} from '../../../actions/admin/menuItemsAction';
import {
  fetchUpcomingEngagements,
} from '../../../actions/admin/engagementsAction';
import {
  formatDate, isStartgreaterThanEnd
} from '../../../helpers/formatMealItems';

import Loader from '../../common/Loader/Loader';
import DeleteMenuModal from './DeleteMenuModal';
import Menutable from './MenuTable';

/**
 *
 *
 * @description Menus Component
 *
 * @class Menus
 * @extends Component
 */
export class Menus extends Component {
  static initialState = () => ({
    menus: [],
    displayModal: false,
    displayDeleteModal: false,
    modalTitle: '',
    modalButtontext: '',
    menuDetails: {},
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    editMenu: false,
  });

  constructor(props) {
    super(props);
    this.state = Menus.initialState();
  }

  /**
   * @description update menus
   * Can be removed in favor of loading menus from DB
   *
   * @memberOf Menus
   *
   * @returns { undefined }
   */
  componentDidMount() {
    this.props.fetchUpcomingEngagements();
    this.props.fetchMealItems();
    this.props.fetchMenus(formatDate(
      this.state.startDate), formatDate(this.state.endDate)
    ).then(() => {
      this.props.fetchVendorEngagements();
    });
  }

  /**
   * @description fetch menu given date range
   *
   * @memberOf Menus
   *
   * @returns { undefined }
   */
  handleViewMenu = () => {
    const { startDate, endDate } = this.state;
    const result = isStartgreaterThanEnd(startDate, endDate);

    if (result) {
      return toast.error(result);
    }
    this.props.fetchMenus(formatDate(startDate), formatDate(endDate));
  };

  /**
   * @description handles date range change
   *
   * @memberOf Menus
   *
   * @param { Object } selectOption
   * @param { Object } name
   * @returns { undefined }
   */
  onChange = (selectOption, name) => {
    this.setState({
      [name]: selectOption
    });
  };

  /**
   *
   * @method showAddModal
   *
   * @memberOf Menus
   *
   * @param {Object} menu
   * @param {boolean} edit
   *
   * @returns { void }
   */
  showAddModal = (menu, edit = false) => {
    this.setState(prev => ({
      displayModal: !prev.displayModal,
      modalTitle: !edit ? 'ADD MENU' : 'EDIT MENU',
      modalButtontext: !edit ? 'Add Menu' : 'Update Menu',
      menuDetails: menu,
      editMenu: edit,
    }));
  };

  /**
   *
   * @method showDeleteModal
   *
   * @memberOf Menus
   *
   * @param {object} menuDetails
   *
   * @returns {void}
   */
  showDeleteModal = (menuDetails) => {
    this.setState({
      displayDeleteModal: true,
      menuDetails
    });
  };

  /**
   *
   * @method deleteMenu
   *
   * @param {number} menuId
   *
   * @memberOf Menu
   *
   * @returns {void}
   */
  deleteMenu = (menuId) => {
    this.props.deleteMenuItem(menuId)
      .then(() => this.closeModal());
  };

  /**
   *
   * @method closeModal
   *
   * @memberOf Menu
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState(Menus.initialState());
  };

  /**
   * Handles form submission
   *
   * @param {object} menu
   *
   * @memberOf Menu
   *
   * @returns {void}
   */
  handleSubmit = (menu) => {
    if (!this.state.editMenu) {
      this.props.createMenu(menu)
        .then(() => {
          this.closeModal();
        });
    } else {
      const { id, mealPeriod } = this.state.menuDetails;
      this.props.editMenu({ ...menu, id, mealPeriod: mealPeriod.toLowerCase() })
        .then(() => {
          this.closeModal();
        });
    }
  };

  /**
   *
   *
   * @description render menus section
   *
   * @memberOf Menus
   *
   * @returns {JSX}
   */
  renderMenus = () => {
    const {
      error,
      isDeleting,
      mealItems,
      isCreating
    } = this.props.menus;
    const {
      displayModal,
      modalTitle,
      modalButtontext: modalButtonText,
      displayDeleteModal,
      menuDetails,
      startDate,
      endDate
    } = this.state;

    return (
      <div id="admin-menus">
        { error.status
          ? (
            <div className="no-content">
              Error occurred while loading menus :-(
            </div>
          )
          : (
            <Fragment>
              <header>
                <br />
                <div className="menu-header-content">
                  <div className="title-date-range">
                    <span className="title">Menu:</span>
                    <span className="date-range">from</span>
                    <div className="date-input">
                      <DatePicker
                        selected={startDate}
                        onChange={(e) => this.onChange(e, 'startDate')}
                      />
                      <span className="date-range">to</span>
                      <DatePicker
                        selected={endDate}
                        onChange={(e) => this.onChange(e, 'endDate')}
                      />
                    </div>
                    <button
                      id="view-menu"
                      className="button"
                      type="button"
                      onClick={this.handleViewMenu}
                    >
                      View Menu
                    </button>
                  </div>
                  <button
                    id="add-menu"
                    className="button"
                    type="button"
                    onClick={
                      () => this.showAddModal(this.state.menuDetails, false)
                    }
                  >
                    Add menu item
                  </button>
                </div>
              </header>
              <br />
              <main>
                <Menutable
                  menus={this.props.menus}
                  showAddModal={this.showAddModal}
                  showDeleteModal={this.showDeleteModal}
                />
              </main>
              <ToastContainer />
              <MenuModal
                closeModal={this.closeModal}
                modalTitle={modalTitle}
                modalButtonText={modalButtonText}
                displayModal={displayModal}
                vendorEngagements={this.props.upComingEngagements}
                handleSubmit={this.handleSubmit}
                mealItems={mealItems}
                isCreating={isCreating}
                menu={this.state.menuDetails}
              />
              {displayDeleteModal && (
                <DeleteMenuModal
                  display={displayDeleteModal}
                  deleteMenu={this.deleteMenu}
                  closeModal={this.closeModal}
                  deleting={isDeleting}
                  menuDetails={menuDetails}
                />
              )}
            </Fragment>
          )
        }
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.menus.isLoading ? <Loader /> : this.renderMenus()}
      </React.Fragment>
    );
  }
}

Menus.propTypes = {
  upComingEngagements: arrayOf(shape({})),
  fetchVendorEngagements: func.isRequired,
  fetchUpcomingEngagements: func.isRequired,
  fetchMealItems: func.isRequired,
  createMenu: func.isRequired,
  editMenu: func.isRequired,
  deleteMenuItem: func.isRequired,
  isCreating: bool,
  menus: shape({
    isLoading: bool.isRequired,
    isDeleting: bool.isRequired,
    menuList: arrayOf(shape({})),

    dateOfMeal: any,
    error: shape({
      status: bool,
      message: any
    })
  }),
  fetchMenus: func.isRequired,
};

export const mapStateToProps = (state) => (
  {
    menus: state.menus,
    upComingEngagements: state.allEngagements.engagements.engagements
  });

export default connect(mapStateToProps,
  {
    fetchMenus,
    mockMenu,
    deleteMenuItem,
    fetchVendorEngagements,
    fetchUpcomingEngagements,
    fetchMealItems,
    createMenu,
    editMenu,
  })(Menus);
