/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination/lib';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { format, addDays, subDays } from "date-fns";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';;

import MealCard from '../MealCard/MealCard';
import  Modal from '../MealCard/Modal';
import RatingModal from '../common/RatingModal';

import Loader from '../common/Loader/Loader';
import EmptyContent from '../common/EmptyContent';
import 'rc-pagination/assets/index.css';


import {
  fetchOrders,
  filterOrders,
  deleteOrder,
  createRating,
  collectOrder
} from '../../actions/ordersAction';

import { validateDate } from '../../helpers/dateFormatter';
import { fetchMenus } from '../../actions/admin/menuItemsAction';
import { fetchMenu } from '../../actions/menuAction';


/**
 * @description Orders Component
 *
 * @name Orders
 */
export class Orders extends Component {
  /**
   * Creates an instance of OrderHistory page
   * @param {any} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchParam: '',
      start: subDays(new Date, 7),
      end: addDays(new Date(), 7),
      showModal: false,
      modalContent: null,
      showRatingModal: false,
      textArea: '',
      newRating: 0,
      modalTitle: '',
      editOrder: false,
      startDate: format(subDays(new Date(), 20), 'YYYY-MM-DD'),
      endDate: format(new Date(), 'YYYY-MM-DD'),
      isRatingMeal: false
    };


    this.onChange = this.onChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  /**
   * Loads data when component mounts
   *
   * @memberof OrderHistory
   *
   * @returns {*} null
   */
  componentDidMount() {
    const { start, end , endDate, startDate} = this.state;
    const OrdersStartDate = format(start, 'YYYY-MM-DD');
    const OrdersEndDate = format(end, 'YYYY-MM-DD');

    const menuStartDate = format(new Date, 'YYYY-MM-DD');
    const menuEndDate = format(addDays(new Date, 5), 'YYYY-MM-DD');
    this.props.fetchMenus(menuStartDate, menuEndDate)
    this.props.fetchOrders(OrdersStartDate, OrdersEndDate)
    .then(() => {
      if (this.props.orders.orders.length === 0 ) {
        this.props.fetchMenu(startDate, endDate).then(() => {
          this.setState({ 
            isRatingMeal: true
          })
        })
      }
    })
  }



  /**
   * Handles input fields text changes
   *
   * @param {*} { target }
   * @memberof Orders
   *
   * @returns {void}
   */
  onChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  /**
   *
   *
   * @description chhoose filter button class
   *
   * @memberof Orders
   *
   * @returns { String }
  */
  filterClassName = () => {
    const { orders: { orders } } = this.props;
    const { isOpen } = this.state;

      if (isOpen) {
        return 'active';
      }
      return '';
    }

  /**
   * Reset the form fields
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  clearForm() {
    this.setState({
      searchParam: '',
      start: '',
      end: ''
    });
  }

  /**
   * Handles new page request in pagination
   *
   * @memberof Orders
   * @param {number} newPage
   *
   * @returns {void}
   */
  handlePageChange(newPage) {
    const { orders } = this.props;
    if (orders.isFiltered) {
      this.props.filterOrders({ ...this.state, page: newPage });
    } else {
      this.props.fetchOrders(newPage);
    }
  }


  /**
   * Handles search/filter of orders
   *
   * @memberof Orders
   * @returns {void}
   */
  handleFilter() {
    const { searchParam, start, end } = this.state;
    const dates = validateDate(start, end);

    if(dates){
      const order = {
        searchParam,
        startDate: dates.startDate,
        endDate: dates.endDate
      }

      this.props.filterOrders(order)
        .then(() => this.setState({ isOpen: false }))
    }


  }

  /**
   * Display a summary for pagination
   *
   * @param {number} total
   * @param {array} range
   * @memberof Orders
   *
   * @returns {string} summary
   */
  showTotal(total, range) { //eslint-disable-line
    return `Showing ${range[0]} - ${range[1]} of ${total} items`;
  }

  /**
   * Display a modal to rate a meal
   *
   * @param {object} meal
   * @memberof Orders
   *
   * @returns {void}
   */
  showRatingModal = meal => {
    this.setState({
      modalContent: meal,
      showRatingModal: true
    });
  }

   /**
   * Display a modal
   *
   * @param {object} meal
   * @memberof Orders
   *
   * @returns {void}
   */
  showModal = (meal, modalTitle, edit=false) => {
    this.setState({
      modalContent: meal,
      showModal: true,
      editOrder: edit,
      modalTitle
    });
  }

  /**
   * Delete an order
   *
   * @param {string} id
   * @memberof Orders
   *
   * @returns {void}
   */
  deleteOrder(id) {
    this.props.deleteOrder(id)
      .then(() => this.hideModal());
  }

  tapOrder = (modalContent) => {
    const orderDetails = {
      orderDate: format(modalContent.dateBookedFor, 'YYYY-MM-DD'),
      orderType: modalContent.mealPeriod,
      userId: modalContent.userId
    }
    this.props.collectOrder(orderDetails)
      .then(() => window.location.reload())
  }

  /**
   * Hide modal
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  hideModal() {
    this.setState({
      showModal: false,
      showRatingModal: false,
      textArea: ''
    });
  }

  /**
   * Toggle Filter m
   * odal
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  openFilterModal = () => {
    this.setState(prevProps => ({
      isOpen: !prevProps.isOpen
    }))
  }


  /**
   * Submit ratings
   *
   * @memberof Orders
   *
   * @returns {void}
   */
  handleRatingSubmit = ({ rating, comment }) => {
    const { modalContent } = this.state;
    const {menuList} = this.props.menu;
    const engagement = menuList.filter(menu => menu.id == modalContent.menuId);
    let vendorEngagementId = modalContent.vendorEngagementId || 0;
    let mainMealId = modalContent.mealItems.filter(meal => meal.mealType === 'main')[0].id
    const serviceDate = format(modalContent.dateBookedFor, 'YYYY-MM-DD');
    if (engagement.length > 0){
      vendorEngagementId= engagement[0].vendorEngagementId;
      mainMealId =engagement[0].mainMealId
    }

    const ratingDetails = {
      channel: "web",
      comment,
      rating,
      orderId: modalContent.id,
      engagementId: vendorEngagementId,
      mainMealId,
      serviceDate
    };
    this.props.createRating(ratingDetails)
    .then(() => {
      this.hideModal();
      location.reload();
    });
  }

    /**
   * Generate title for Rating modal
   *
   * @memberof Orders
   * @returns {string}
   */
  generateTitle = () => {
    const { modalContent } = this.state;
    if (modalContent) {
      return `Rate Meal for ${format(modalContent.dateBookedFor, 'dddd, Do MMMM YYYY')}`;
    }
  }

  /**
   *
   * This is React render method that render the UI on the dom
   * @function Orders
   *
   * @return { void }
   */
  render() {
    const meals = this.props.pastMenus
      .reduce((accu, curr) => [...accu, ...curr.menus], [])
      .map((meal) => ({
        id: 0,
        mealItems: [...meal.sideItems, ...meal.proteinItems, meal.mainMeal],
        orderStatus: 'N/A',
        dateBookedFor: meal.date,
        user_rating: null,
        hasRated: false,
        menuId: meal.id,
        vendorEngagementId: meal.vendorEngagementId
      }));
    const { orders } = this.props;
    const mealsToRate = orders.orders && orders.orders.length > 0 ? orders.orders : meals
    const {
      isOpen,
      searchParam,
      start,
      end,
      showRatingModal,
      modalTitle,
      isRatingMeal,
      modalContent
    } = this.state;
    const loading = (orders.isLoading || this.props.isLoading) && !isRatingMeal;
    return (
      <Fragment>
        {loading && <Loader />}
        <div className={`order-history ${loading && !isRatingMeal && 'blurred'}`}>
          <div className="title">
            <span>{isRatingMeal && !orders.isFiltered ? 'Past Meals':  'Order History' }</span>
            <ToastContainer />
            {orders.isFiltered && <span>&nbsp;(filtered)</span>}
            <div className="filter">
              <button
                className={`button ${this.filterClassName()}`}
                type="button"
                onClick={this.openFilterModal}
              ><i className="fas fa-filter" />   Filter
              </button> 
              <form
                className={`dropdown ${isOpen && "active"}`}
              >
                <div>
                  <input
                    className="input"
                    type="text"
                    name="searchParam"
                    placeholder="Search order"
                    onChange={this.onChange}
                    value={searchParam}
                  />
                </div>
                <div>
                  <label className="date-label" htmlFor="start">Start Date
                    <DatePicker
                      onChange={(date) => this.setState({ start: date })}
                      value={start}
                    />
                  </label>
                </div>
                <div>
                  <label className="date-label" htmlFor="end">End Date
                    <DatePicker
                      onChange={(date) => this.setState({ end: date })}
                      value={end}
                    />
                  </label>
                </div>
                <button
                  className="input btn"
                  type="button"
                  onClick={this.handleFilter}
                  disabled={orders.isLoading}
                >
                  Submit
                </button>
                <div className="actions">
                  <a
                    className="action-item"
                    role="button"
                    tabIndex="0"
                    onClick={() => this.clearForm()}
                  >Clear filters
                  </a>
                  <a
                    className="action-item"
                    role="button"
                    tabIndex="0"
                    onClick={() => this.setState({ isOpen: false })}
                  >Close
                  </a>
                </div>
              </form>
            </div>
          </div>
          {
            orders.error && (
              <div className="network-error">
                {orders.error.response || "Unable to connect to the internet"}
              </div>)
          }
          {!isRatingMeal && <Modal
            displayModal={this.state.showModal}
            closeModal={this.hideModal}
            deleteOrder={this.deleteOrder}
            modalContent={modalContent}
            modalTitle={modalTitle}
            tapOrder={this.tapOrder}
            editOrder={this.editOrder}
            edit={this.state.editOrder}
          />}
          <RatingModal
            displayModal={showRatingModal}
            closeModal={this.hideModal}
            modalTitle={this.generateTitle()}
            handleSubmit={this.handleRatingSubmit}
            isLoading={orders.isLoading}
          />   
          {
           !loading && mealsToRate.length > 0
              ? (
                <Fragment>
                  <div className="container">
                    {
                      mealsToRate.map((meal, index) => (
                        <MealCard
                          key={index}
                          meal={meal}
                          showModal={this.showModal}
                          showRatingModal={this.showRatingModal}
                        />
                      ))
                    }
                    </div>
                  {
                    orders.orders.length > 15 && (
                      <Pagination
                        locale={{ items_per_page: 'Items' }}
                        onChange={this.handlePageChange}
                        current={+orders.currentPage}
                        pageSize={9}
                        total={+orders.totalRecords}
                        className="pagination"
                        showTotal={this.showTotal}
                      />
                    )
                  }
                </Fragment>
              )
              : (
                <EmptyContent
                  message="No orders available at the moment"
                />
              )
          }
        </div>
      </Fragment>
    );
  }
}

Orders.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  orders: PropTypes.shape({
    totalRecords: PropTypes.number,
    meals: PropTypes.array
  }),
  filterOrders: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func,
  fetchMenu: PropTypes.func.isRequired,
  pastMenus: PropTypes.array
};

Orders.defaultProps = {
  orders: {
    meals: [],
    totalRecords: 0
  },
  match: {
    url: '/'
  }
};

const mapStateToProps = state => ({
  orders: state.orders,
  menu: state.menus,
  pastMenus: state.upcomingMenus.menus,
  isLoading: state.upcomingMenus.isLoading
});

const actionCreators = {
  fetchOrders, filterOrders, deleteOrder, createRating, collectOrder,fetchMenus, fetchMenu
};

export default connect(mapStateToProps, actionCreators)(Orders);
