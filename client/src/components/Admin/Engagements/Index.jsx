import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropType from 'prop-types';
import moment from 'moment';

import Loader from '../../common/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { EngagementCard } from './EngagementCard';
import DeleteEngagementModal from './DeleteEngagementModal';
import Modal from './Modal';
import { fetchEngagements, fetchVendors, createEngagement } from '../../../actions/admin/engagementsAction';
import EmptyContent from '../../common/EmptyContent';
import { formatDate } from '../../../helpers/formatMealItems';


/**
 * @class Engagements
 * 
 * 
 * @extends {Component}
 */
export class Engagements extends Component {
  state = {
    startDate: moment(),
    endDate: moment().add(7, 'days'),
    selectedOption: null,
    datePicker: moment(),
    displayModal: false,
    displayDeleteModal: false,
    modalTitle: '',
    modalButtontext: ''
  }

  componentDidMount() {
    this.props.fetchEngagements();
    this.props.fetchVendors();
  }
  
  
  /**
   * Handles input fields text changes
   *
   * @param {object} event
   *
   * @memberof Engagements
   * 
   * @returns {void}
   */
  onChange = (data, selectedOption) => {
    this.setState({
      [selectedOption]: data
    })
  }
  
  /**
   * Handles form submission
   * 
   * @memberof Engagements
   * 
   * @returns {void}
   */
  handleSubmit = event => {
    event.preventDefault();
    const { selectedOption, startDate, endDate, modalTitle } = this.state;

    if (selectedOption && modalTitle === "ADD ENGAGEMENT") {
      this.props.createEngagement({
        vendorId: selectedOption.vendorId,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      })
        .then(() => this.closeModal());
    }
  }

   /**
   * 
   * @method showAddModal
   *
   * 
   * @memberof Engagements
   * 
   * @returns {void}
   */
  showAddModal = () => {
    this.setState({
      displayModal: true,
      modalTitle: 'ADD ENGAGEMENT',
      modalButtontext: 'Add Engagement'
    })
  }

  /**
   * 
   * @method showDeleteModal
   *
   * @param {object} engagement
   * 
   * @memberof Engagements
   * 
   * @returns {void}
   */
  showDeleteModal = (engagement) => {
    this.setState({
      displayDeleteModal: true
    });
  }

  /**
   * 
   * @method closeModal
   * 
   * @memberof Engagements
   * 
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayModal: false,
      displayDeleteModal: false
    })
  }

  
  renderEngagements = engagements => {
    return engagements.map((engagement, key) => (
      <EngagementCard 
        key={key}
        engagement={engagement}
        showDeleteModal={this.showDeleteModal}
      />
    ))
  };

  render() {
    const { isLoading, engagements, vendors } = this.props;

    const vendorsResult = vendors.map(result => (
      { value: result.name, label: result.name, vendorId: result.id }
    ));

    const {
      startDate,
      endDate, 
      selectedOption,
      displayModal,
      displayDeleteModal,
      modalTitle, 
      modalButtontext
    } = this.state;
    
    return (
      <Fragment>
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Vendors Engagement</h3>
            <button
              type="button"
              name="addEngagement"
              className="engagement-button"
              onClick={this.showAddModal}
            >
              Add Engagements
            </button>
          </div>
          
          { engagements.length > 0 && (
          <div className="table-header custom-row">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-3">Start Date</div>
            <div className="custom-col-3">End Date</div>
            <div className="custom-col-2">Options</div>
          </div>)}
      
          { this.renderEngagements(engagements)}

          { !isLoading && !engagements.length && (
            <EmptyContent message= "No engagement has been added yet" />
          )}
          
        </div>
        <ToastContainer />
        <Modal 
            startDate={startDate}
            endDate={endDate}
            onChange={this.onChange} 
            handleSubmit={this.handleSubmit}
            selectedOption={selectedOption}
            vendorsResult={vendorsResult}
            displayModal={displayModal}
            closeModal={this.closeModal}
            modalTitle={modalTitle}
            modalButtontext={modalButtontext}
        />
        <DeleteEngagementModal
            displayDeleteModal={displayDeleteModal}
            closeModal={this.closeModal}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ allEngagements }) => ({
  isLoading: allEngagements.isLoading,
  engagements: allEngagements.engagements,
  vendors: allEngagements.vendors
});

Engagements.propTypes = {
  fetchEngagements: PropType.func.isRequired,
  fetchVendors: PropType.func.isRequired,
  createEngagement: PropType.func.isRequired
};

export default connect(
  mapStateToProps, 
  { 
    fetchEngagements, 
    fetchVendors, 
    createEngagement 
  }
)(Engagements);