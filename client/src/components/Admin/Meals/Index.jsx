import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination/lib';
import { ToastContainer } from 'react-toastify';
import MealCard from './MealCard';
import Loader from '../../common/Loader/Loader';

import {
  fetchMealItems,
  showMealModal,
  deleteMealItem
} from '../../../actions/admin/mealItemsAction';
import MealModal from './MealModal/Index';
import DeleteMealModal from './DeleteMealModal';
import EmptyContent from '../../common/EmptyContent';

/**
 *
 * @description Meals component visible only to admin
 *
 * @class Meals
 *
 * @extends Component
 */
export class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDeleteModal: false,
      modalContent: {},
      page: 1,
      pageSize: 20,
      mealName: '',
      foundMeals: [],
      isSearching: false
    };
  }

  componentDidMount() {
    const { page } = this.state;
    this.props.fetchMealItems(page);
  }

  /**
   *
   * @method toggleAddModal
   *
   * @param {boolean} mealDetails
   * @param {boolean} edit
   *
   * @memberof Meals
   *
   * @returns {void}
   */
  toggleAddModal = (mealDetails, edit = false) => {
    const { displayMealModal } = this.props;

    this.props.showMealModal(!displayMealModal, edit);

    this.setState({
      mealDetails
    });
  }

  /**
   *
   * @method showDeleteModal
   *
   * @param {object} mealDetails
   *
   * @memberof Meals
   *
   * @returns {void}
   */
  showDeleteModal = (mealDetails) => {
    this.setState({
      modalContent: mealDetails,
      displayDeleteModal: true
    });
  }

  /**
   *
   * @method deleteMealItem
   *
   * @param {object} mealItemId
   *
   * @memberof Meals
   *
   * @returns {void}
   */
  deleteMealItem = (mealItemId) => {
    this.props.deleteMealItem(mealItemId)
      .then(() => this.closeModal());
  }

  /**
   *
   * @method closeModal
   *
   * @memberof Meals
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayDeleteModal: false
    });
  }

  /**
   *
   *
   * @description handle page change
   *
   * @param { Number } page
   *
   * @memberof Meals
   *
   * @returns { String }
   */
  pageChange = (page) => {
    this.setState({ page });
    this.props.fetchMealItems(page);
  }

  /**
   * @method renderMeal
   *
   * @memberof Meals
   *
   * @param {object} meal
   *
   * @returns {JSX}
   */
  renderMeal = (meal) => (
    <MealCard
      key={meal.id}
      {...meal}
      showDeleteModal={this.showDeleteModal}
      showEditModal={this.toggleAddModal}
    />
  );


  /**
   * @method searchMealItems
   *
   * @memberof Meals
   *
   * @param {object} event
   * 
   * @param {object} meals
   *
   * @returns {JSX}
   */
  searchMealItems = (event, meals) => {
    const stateChanged = new Promise(resolve => 
      resolve(this.setState({
        [event.target.name]: event.target.value,
        isSearching: true
      }))
    );
    return stateChanged.then(() => { 
      const foundMeals =  meals && meals.filter(meal => meal.name.toLowerCase().includes(this.state.mealName.toLowerCase()));
      this.setState({
        foundMeals
      });
    });
  };

  render() {
    const {
      displayMealModal,
      isLoading,
      isDeleting,
      meals,
      pagination
    } = this.props;
    const {
      displayDeleteModal, modalContent, mealDetails, pageSize, mealName, foundMeals, isSearching
    } = this.state;

    return (
      <Fragment>
        <ToastContainer />
        <MealModal
          toggleAddModal={this.toggleAddModal}
          show={displayMealModal}
          mealDetails={mealDetails}
        />
        { isLoading && (<Loader />) }
        <div className={`${isLoading && 'blurred'}`} id="admin-meals">
          <header>
            <div>
              <br/><span className="title pull-left">Meal Items</span>
            <span className="header-group">
                <input
                  type="text"
                  placeholder="Search meal items ..."
                  name="mealName"
                  className="search-bar"
                  value={mealName}
                  onChange={(event) => this.searchMealItems(event, meals)}
                />
                <button
                  className="pull-right"
                  type="button"
                  onClick={() => this.toggleAddModal(null)}
                >
                  Add meal item
                </button>
            </span>
            </div>
          </header>

          <main>
            <div>
              {foundMeals.length > 0 ? foundMeals.map((meal) => this.renderMeal(meal)) :
                foundMeals.length < 1 && isSearching === true ? <EmptyContent message="Meal not found" /> :
                meals.map((meal) => this.renderMeal(meal)) }
              { !isLoading && !meals.length && (
                <EmptyContent message="No meal has been added yet" />
              )}
            </div>

            {
              pagination && meals.length
              && (
                <Pagination
                  onChange={this.pageChange}
                  current={pagination.current_page}
                  pageSize={pageSize}
                  total={pagination.total_rows}
                  className="pagination"
                />
              )
            }
          </main>
        </div>
        <DeleteMealModal
          displayDeleteModal={displayDeleteModal}
          modalContent={modalContent}
          closeModal={this.closeModal}
          deleteMealItem={this.deleteMealItem}
          isDeleting={isDeleting}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ mealItems }) =>( {
    meals: [...mealItems.meals].reverse(),
    pagination: mealItems.pagination,
    isLoading: mealItems.isLoading,
    displayMealModal: mealItems.mealModal.show,
    isDeleting: mealItems.isDeleting
});

const mapDispatchToProps = {
  fetchMealItems,
  showMealModal,
  deleteMealItem
};

Meals.propTypes = {
  fetchMealItems: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
  showMealModal: PropTypes.func.isRequired,
  deleteMealItem: PropTypes.func,
  isDeleting: PropTypes.bool,
  meals: PropTypes.arrayOf(PropTypes.shape({})),
  displayMealModal: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
