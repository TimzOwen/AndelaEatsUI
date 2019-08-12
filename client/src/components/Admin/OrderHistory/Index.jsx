import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination/lib';
import OrderCard from './OrderCard';
import EmptyContent from '../../common/EmptyContent';
import Loader from '../../common/Loader/Loader';
import { fetchOrders, handlePaginationChange } from '../../../actions/admin/ordersAction';
import OrdersHeader from './OrdersHeader';
import svg from '../../../assets/images/download-icon.svg';

/**
 *
 * @class Orders
 * @extends {Component}
 */
export class OrderHistory extends Component {
  state = {
    currentPage: 1,
  }

  componentDidMount() {
    const { currentPage } = this.state;
    const { handlePaginationChange, fetchOrders } = this.props;
    handlePaginationChange(currentPage);
    fetchOrders(currentPage);
  }

  redirectToExport = () => {
    const { history } = this.props;
    history.push('/admin/orders/export');
  }

  onChange = (current) => {
    const { handlePaginationChange, fetchOrders} = this.props;
    handlePaginationChange(current)
    fetchOrders(current)
    
    this.setState({
      currentPage: current
    });
   }
   

  /**
   * @method renderOrder
   *
   * @memberof OrderHistory
   *
   * @param {object} order
   *
   * @returns {JSX}
   */
  renderOrder = (orders = []) => {
    return orders.map((order, key) => (
      <OrderCard
        key={key}
        order={order}
      />
    ));
  }

  render() {
    const {
      orderHistory: { orders, meta },
      isLoading,
    } = this.props;

    const { currentPage } = this.state;

    return (
      <section className="admin-orders">
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'}`}>

          { orders && (<OrdersHeader
            title="Order History"
            orders={orders}
            redirectToExport={this.redirectToExport}
            svg={svg}
            handleFilter={this.handleFilter}
          />
        )}

          {
            orders && orders.length === 0 ?
              (
                <div id="admin-orders-no-content">
                  <EmptyContent message="No meal orders requested yet" />
                </div>
              ) : 
              <Fragment>
                <div className="table-header">
                  <div className="custom-col-4">Name</div>
                  <div className="custom-col-2">Order Date</div>
                  <div className="custom-col-2">Collection Date</div>
                  <div className="custom-col-4">Order Description</div>
                  <div className="custom-col-2">Status</div>
                </div>

                { orders && this.renderOrder(orders)}

                {
                  meta && meta.total_rows > 14 && (
                    <Pagination
                      onChange={this.onChange}
                      current={currentPage}
                      pageSize={15}
                      total={meta.total_rows}
                      className="pagination"
                    />
                  )
                }
              </Fragment>
            }
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ mealOrders }) => ({
  orderHistory: mealOrders.orders,
  isLoading: mealOrders.isLoading
});

OrderHistory.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default connect(mapStateToProps, { fetchOrders, handlePaginationChange })(OrderHistory);
