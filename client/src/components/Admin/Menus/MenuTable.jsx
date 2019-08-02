/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  func, shape, arrayOf, bool, any
} from 'prop-types';
import { format } from "date-fns";
import { ToastContainer } from "react-toastify";

import { formatMenuItemDate } from '../../../helpers/menusHelper';
import Loader from "../../common/Loader/Loader";
import EmptyContent from '../../common/EmptyContent';
import RatingModal from '../../common/RatingModal';
import { rateVendor } from '../../../actions/vendorsAction';


/**
 *
 *
 * @description MenusTable Component
 *
 * @class MenuTable
 * @extends Component
 */
export class MenuTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  /**
   *
   * @description render side and protein listing
   *
   * @param { Array } itemsAvailable
   * @param { Integer } optionsCanPick
   *
   * @memberof Menus
   *
   * @returns { JSX }
   */
  renderProteinSideItems = (itemsAvailable, optionsCanPick) => (
    <div className="custom-col-6 clearfix">
      <span className="side-pick-count">
        {optionsCanPick}
      </span>
      {this.commaJoinComplementryItems(itemsAvailable.map(item => ({
        value: item.id, label: item.name
      })))}
    </div>
  );

  /**
   *
   *
   * @description joins strings
   *
   * @param { Array } array
   * @param { Stirng } key
   *
   * @returns { String }
   *
   * @memberof Menus
   */
  commaJoinComplementryItems = (array) => (
    array.map(item => item.label).join(', ')
  );

  /**
   * @description generate menu rows
   *
   * @returns { Array }
   *
   * @memberof MenuTable
   */
  renderRows = () => {
    const { menuList } = this.props.menus;
    return menuList.map(menuItem => {
      const {
        id,
        mainMeal,
        sideItems,
        proteinItems,
        allowedSide,
        allowedProtein,
        date,
        vendorEngagementId
      } = menuItem;
      const vendorList = this.props.engagements
        ? this.props.engagements : [];
      const menuVendor = vendorList
        .filter(vendor => vendor.id === vendorEngagementId)[0];
      return (
        <div key={id} className="ct-row">
          <div className="ct-wrap">
            <div className="custom-col-5">
              {formatMenuItemDate(date)}
            </div>
            <div className="custom-col-5">
              {menuVendor ? menuVendor.vendor.name : '---------'}
            </div>
            <div className="custom-col-4">{mainMeal.name}</div>
            {this.renderProteinSideItems(
              proteinItems,
              allowedProtein
            )}

            {this.renderProteinSideItems(
              sideItems,
              allowedSide
            )}

            {!this.props.preview ? (
              <div className="custom-col-5 option">
                <div onClick={() => this.props.showAddModal(menuItem, true)}>
                  <span className="edit-menu">Edit</span>
                </div>

                <div onClick={() => this.props.showDeleteModal(menuItem)}>
                  <span className="delete-menu">Delete</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  }

  /**
   * @method toggleRatingModal
   *
   * @memberOf MenuTable
   *
   * @return {void}
   */
  toggleRatingModal = () => {
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  /**
   * @method renderMenuBody
   *
   * @memberOf MenuTable
   *
   * @return {React.ReactNode}
   */
  renderMenuBody = () => {
    const { isFetching } = this.props;
    const isPastVendor = this.getPastVendor();
    const isDisabled = isFetching || !isPastVendor ? 'btn-disabled' : '';
    const buttonText = isFetching ? 'Rating Vendor...' : 'rate vendor';
    return (
      <React.Fragment>
        {this.props.preview
          && (
            <div className="vendors-header">
              <h3 className="vendor-menu menu-header">Available Menus</h3>
              <button
                type="button"
                name="rateVendor"
                disabled={isFetching}
                title={isDisabled ? "Can't rate vendor at the moment" : "Rate former vendor"}
                className={`engagement-button rate-vendor-button ${isDisabled}`}
                onClick={isDisabled ? () => {} : this.toggleRatingModal}
              >
                {buttonText}
              </button>
            </div>
          )
        }
        <div className="custom-table">
          {this.props.menus.menuList.length
            ? (
              <React.Fragment>
                <div className="ct-header">
                  <div className="custom-col-5">Date</div>
                  <div className="custom-col-5">Vendor</div>
                  <div className="custom-col-4">Main Meal</div>
                  <div className="custom-col-6">Protein</div>
                  <div className="custom-col-6">Side</div>
                  {!this.props.preview
                    ? <div className="custom-col-5">Options</div>
                    : null}
                </div>
                <div className="ct-body">{this.renderRows()}</div>
              </React.Fragment>
            ) : <EmptyContent message="No menus within the selected date range" />}
        </div>
      </React.Fragment>
    );
  }

  /**
   * @method getPastVendor
   *
   * @memberOf MenuTable
   *
   * @return {Object | null}
   */
  getPastVendor = () => {
    const { engagements } = this.props;
    let vendor = null;
    if (engagements && engagements.length > 1) {
      const len = engagements.length;
      vendor = this.props.engagements.sort((a, b) => a.id - b.id)[len - 2];
    }
    return vendor;
  }

  /**
   * @method rateVendor
   *
   * @memberOf MenuTable
   *
   * @return {void}
   */
  rateVendor = ({ comment, rating }) => {
    /* !Todo - a better way of getting the immediate past
     * vendor from the server should be implemented to
     * make this feature more robust
     */
    const { id, vendorId, endDate } = this.getPastVendor();
    const serviceDate = format(endDate, 'YYYY-MM-DD');
    const vendorDetails = {
      comment,
      rating,
      engagementId: id,
      vendorId,
      serviceDate,
      channel: 'web'
    };
    this.props.rateVendor(vendorDetails).then(() => {
      this.toggleRatingModal();
    });
  }

  /**
   * Generate title for RatingModal component
   * @method generateTitle
   *
   * @memberOf MenuTable
   *
   * @return {string}
   */
  generateTitle = () => {
    const pastVendor = this.getPastVendor();
    if (pastVendor) {
      return `Rate ${pastVendor.vendor.name}`;
    }
  }

  render() {
    const { isLoading } = this.props.menus;
    return (
      <React.Fragment>
        <ToastContainer />
        <RatingModal
          modalTitle={this.generateTitle()}
          handleSubmit={this.rateVendor}
          displayModal={this.state.show}
          closeModal={this.toggleRatingModal}
        />
        <div className="menu-table-row">
          {isLoading
            ? <Loader />
            : this.renderMenuBody()
          }
        </div>
      </React.Fragment>

    );
  }
}

MenuTable.propTypes = {
  menus: shape({
    menuList: arrayOf(shape({})),
    error: shape({
      status: bool,
      message: any
    })
  }),
  preview: bool,
  showAddModal: func,
  showDeleteModal: func,
  engagements: arrayOf(shape({})),
  rateVendor: func,
  isFetching: bool,
};

export const mapStateToProps = (state) => ({
  engagements: state.allEngagements.engagements.engagements,
  isFetching: state.allVendors.isLoading
});

export default connect(mapStateToProps, { rateVendor })(MenuTable);
