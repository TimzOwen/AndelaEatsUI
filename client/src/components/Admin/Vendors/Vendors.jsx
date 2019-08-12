import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { VendorCard } from './VendorCard';
import Loader from '../../common/Loader/Loader';
import {
  fetchVendors,
  suspendVendor,
  createVendor,
  updateVendor
} from '../../../actions/vendorsAction';
import SuspendVendorModal from "./SuspendVendorModal";
import inputValidation from '../../../helpers/inputValidation';
import EmptyContent from '../../common/EmptyContent';
import Modal from "../../common/Modal";
import Input from '../../common/FormInputs';

/**
 *
 * @class Vendors
 * @extends {Component}
 */
export class Vendors extends Component {
  static initialState = () => ({
    id: '',
    name: '',
    address: '',
    contactPerson: '',
    tel: '',
    errors: {},
    displayModal: false,
    displaySuspendModal: false,
    modalContent: {},
    modalTitle: '',
    modalButtonText: ''
  });

  constructor(props) {
    super(props);
    this.state = { ...Vendors.initialState() };
    this.onChange.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchVendors();
  }
  
  /**
   * Handles input fields text changes
   *
   * @param {object} event
   *
   * @memberOf Modal
   * 
   * @returns {void}
   */
  onChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  /**
   * 
   * @method showAddModal
   *
   * @memberOf Vendors
   * 
   * @returns {void}
   */
  showAddModal = () => {
    this.setState({
      modalTitle: "ADD VENDOR",
      modalButtonText: "Add Vendor",
      displayModal: true
    });
  };

  /**
   * 
   * @method showEditModal
   *
   * @param {object} vendor
   * 
   * @member of Vendors
   * 
   * @returns {void}
   */
  showEditModal = (vendor) => {
    const {
      id, name, address, contactPerson, tel 
    } = vendor;
    this.setState({
      modalTitle: "EDIT VENDOR",
      modalButtonText: "Update",
      id,
      name,
      address,
      contactPerson,
      tel,
      displayModal: true,
    });
  };


  /**
   * Handles form submission
   *
   * @memberOf Vendors
   * 
   * @returns {void}
   */
  handleSubmit = () => {
    const { id, name, address, contactPerson, tel } = this.state;
    const vendor = {
      name,
      address,
      contactPerson,
      tel,
      isActive: true
    };
    if (this.state.modalTitle === "ADD VENDOR") {
      this.props.createVendor(vendor)
        .then(() => this.closeModal());
    } else {
      this.props.updateVendor(id, vendor)
        .then(() => this.closeModal());
    }
  };

  /**
   * Handles form validation
   * 
   * @param {object} event
   * 
   * @memberOf Modal
   * 
   * @returns {void}
   */
  formValidation = (event) => {
    event.preventDefault();
    const err = inputValidation(this.state);
    if (err.isEmpty) {
      if (/\+234/.test(this.state.tel)) {
        this.setState({ tel: `0${this.state.tel.substring(4)}` }, () => this.handleSubmit());
      };
    } else {
      this.setState({ errors: err.errors });
    }
  };

  /**
   *  Clears errors Input field onFocus
   * 
   * @member clearErrors
   * 
   * @memberOf Modal
   * 
   * @returns {void}
   */
  clearErrors = () => {
    this.setState({ errors: {} });
  };
  
  /**
   * 
   * @method suspendVendor
   * 
   * @param {Object} vendorId
   * 
   * @memberOf vendors
   * 
   * @returns {void}
   */
  suspendVendor = (vendorId) => {
    this.props.suspendVendor(vendorId)
      .then(() => this.closeModal());
  };

  /**
   * 
   * @method showSuspendModal
   *
   * @param {object} vendor
   * 
   * @memberOf Vendors
   * 
   * @returns {void}
   */
  showSuspendModal = (vendor) => {
    this.setState({
      displaySuspendModal: true,
      modalContent: vendor
    });
  };

  /**
   * 
   * @method closeModal
   *
   * @memberOf Vendors
   * 
   * @returns {void}
   */
  closeModal = () => {
    this.setState(Vendors.initialState());
  };

  /**
   * @method renderVendor
   *
   * @memberOf Vendors
   *
   * @param {object} vendor
   *
   * @returns JSX
   */
  renderVendor = (vendor) => {
    const rating = Math.ceil(Math.random() * 5);
    return (
      <VendorCard 
        key={vendor.id}
        vendor={vendor}
        rating={rating}
        showSuspendModal={this.showSuspendModal}
        showEditModal={this.showEditModal}
      />
    );
  };

  checkErrorState = (formField) => (
    (this.state.errors && this.state.errors[formField]) ? this.state.errors[formField] : ""
  );
  renderVendorInputs = () => (
    <div>
      
      <Input 
        id='name'
        value={this.state.name}
        name='name'
        onChangeHandler={this.onChange}
        label='Name'
        clearErrors={this.clearErrors}
        error={this.checkErrorState('name')}
        />
      <Input 
        id='address'
        onChangeHandler={this.onChange}
        label='Address'
        error={this.checkErrorState('address')}
        clearErrors={this.clearErrors}
        value={this.state.address}
        name='address'
        />
      <Input 
        error={this.checkErrorState('tel')}
        name='tel'
        id='tel'
        value={this.state.tel}
        label='Phone'
        onChangeHandler={this.onChange}
        clearErrors={this.clearErrors}
        />
      <Input 
        clearErrors={this.clearErrors}  
        id='contactPerson'
        error={this.checkErrorState('contactPerson')}
        label='Contact Person'
        onChangeHandler={this.onChange}
        name='contactPerson'
        value={this.state.contactPerson}
        />
    </div>
  );

  render() {
    const {
      isLoading,
      vendors,
      isCreating, 
      isSuspending,
      isUpdating
    } = this.props;
    const {
      displayModal,
      displaySuspendModal,
      modalContent,
      modalTitle,
      modalButtonText
    } = this.state;

    return (
      <div>
        { isLoading && <Loader /> }
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Vendors</h3>
            <button 
              type="button"
              name="addVendor" 
              className="vendor-button"
              onClick={this.showAddModal}
            >
              Add Vendor
            </button>
          </div>

          { vendors.length > 0 && (
          <div className="table-header custom-row table-align">
            <div className="custom-col-4">Name</div>
            <div className="custom-col-2">Contacts</div>
            <div className="custom-col-3">Rating</div>
            <div className="custom-col-3">Options</div>
          </div>)}

          { vendors.map((vendor) => (
            this.renderVendor(vendor))
          )}
          { !isLoading && !vendors.length && (
            <EmptyContent message="No vendor has been added yet" />
          )}

        </div>
        <ToastContainer />
        <Modal
         loading={isCreating || isUpdating }
          children={this.renderVendorInputs()}
          closeModal={this.closeModal}
          displayModal={displayModal}
          formValidation={this.formValidation}
          modalButtonText={modalButtonText}
          modalTitle={modalTitle}
        />
        <SuspendVendorModal
          suspendVendor={this.suspendVendor}
          isSuspending={isSuspending}
          closeModal={this.closeModal}
          modalContent={modalContent}
          displaySuspendModal={displaySuspendModal}
        />
      </div>
    );
  }
}

export const mapStateToProps = ({ allVendors }) => ({
  isLoading: allVendors.isLoading,
  isCreating: allVendors.isCreating,
  isSuspending: allVendors.isSuspending,
  isUpdating: allVendors.isUpdating,
  vendors: allVendors.vendors
});

Vendors.propTypes = {
  suspendVendor: PropTypes.func,
  isLoading: PropTypes.bool,
  isCreating: PropTypes.bool,
  isSuspending: PropTypes.bool,
  isUpdating: PropTypes.bool,
  createVendor: PropTypes.func,
  updateVendor: PropTypes.func,
  vendors: PropTypes.arrayOf(PropTypes.shape({})),
  fetchVendors: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    fetchVendors,
    suspendVendor,
    createVendor,
    updateVendor
  }
)(Vendors);
