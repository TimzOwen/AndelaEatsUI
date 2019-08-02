/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, createRef } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import {
  validateAddMealImage,
} from '../../../helpers/mealsHelper';
import { upload } from '../../../helpers/cloudinary';
import DeleteModal from '../../common/DeleteModal/DeleteModal';
import Loader from '../../common/Loader/Loader';
import UserCard from './UserCard';
import UserModal from './UserModal';
import { 
  fetchUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  fetchUserRoles }
  from '../../../actions/admin/adminUserAction';
import inputValidation from '../../../helpers/inputValidation';
import EmptyContent from '../../common/EmptyContent';

const initialUser = {
  firstName: '',
  lastName: '',
  roleId: 11,
  imageUrl: ''
}
/**
 * Class representing Users
 * @extends Component
 */
export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showModal: false,
      errors: null,
      user: initialUser, 
      image: {
        file: null,
        dataurl: null,
        error: null,
      },
      imageLoading: false
    }
    this.imageInput = createRef()
  }

  /**
   * method returning imageInput ref
   */
  getImageRef = () => this.imageInput;

  componentDidMount() {
    this.props.fetchUsers()
    .then(() => this.props.fetchUserRoles())
  }


  /**
   *
   *
   * @description handle onChage event
   *
   * @param { Object } event
   *
   * @returns { undefined }
  */
 onChange = event => {
  const { name, value } = event.target;
  const oldUser = { ...this.state.user };
  oldUser[name] = value;
  this.setState(prevState => ({
    user: oldUser,
    errors: {
      ...prevState.errors,
      [name]: ''
    },
  }));
};

/**
  * 
  * @method formValidation
  * 
  * @memberof Users
  * 
  * @param {object} event
  * 
  * @returns {void}
  */
 formValidation = () => {
   const errorObject = {
     firstName: this.state.user.firstName,
     lastName: this.state.user.lastName
   };
   const err = inputValidation(errorObject);
   if (!err.isEmpty) {
     this.setState({ errors: err.errors });
     return true;
   }
   return false;
 }

 /**
  *
  * @description handle onSubmit event
  *
  * @param { Object } event
  *
  * @returns { undefined }
  */
 onSubmit = async event => {
   event.preventDefault();
   if (this.state.image.dataurl) {
     this.setState({imageLoading: true})
      await upload(this.state.image.dataurl).then(payload => {
      this.setState(prevState => ({
        user: {
          ...prevState.user,
          imageUrl: payload.secure_url
        },
        imageLoading: false,
        image: {
          file: null,
          dataurl: null,
          error: null,
        },
      }))
    }).catch(err => {
      this.setState({
        image: {
          file: null,
          dataurl: null,
          error: err.message,
        },
       })
    }
    );
   }

   const { user, image } = this.state;
   const userData = {
     slackId: user.slackId,
     firstName: user.firstName,
     lastName: user.lastName,
     userId: user.userId,
     roleId: user.roleId,
     id: user.id,
     imageUrl: user.imageUrl
     ? user.imageUrl
     : "http://andelaeats-dev.andela.com:3000/assets/images/defaultUser.svg"
   };
   const error = this.formValidation();
   if (!error && !image.error ) {
     const method = !user.id ? this.props.createUser : this.props.updateUser;
     return method(userData).then(() => {
       this.showModal(user);
       this.setState({
         user
       });
     });
   }
 }

 openFileDialog = () => {
   const { current: element } = this.imageInput;
   element.click();
 };

 handleUpload = (e) => {
   const image = e.target.files[0];
   const status = validateAddMealImage(image);
   if (status === true) {
     const reader = new FileReader();
     reader.onload = () => {
       this.setState({
         image: {
           file: image,
           dataurl: reader.result,
           error: null
         },
         imageLoading: false
       });
     };
     reader.readAsDataURL(image);
     reader.onloadstart = () => {
       this.setState({
        imageLoading:true
       })
     }
   } else {
     this.setState({
       image: {
         file: null,
         dataurl: null,
         error: status,
       },
     });
   }
 }
 
  deleteUser = (user) => {
    this.props.deleteUser(user).then(() => {
      this.displayDeleteModal(this.state.user)
    })
  }
  displayDeleteModal = (user=initialUser)=> {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal,
      user
    }));
  };

  showModal = (user)=> {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      user,
      errors: {}
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      user: initialUser,
      image: {
        file: null,
        dataurl: null,
        error: null,
      },
    }));
  }

  render() {
    const { showDeleteModal, showModal, user, errors, image, imageLoading } = this.state;
    const {loading, roles, users } = this.props;
    return (
      <React.Fragment>
        <ToastContainer />
        { loading || imageLoading &&  <Loader/> } 
          <DeleteModal
          closeModal={this.displayDeleteModal}
          displayDeleteModal={showDeleteModal}
          item="User"
          deleteItem={this.deleteUser}
          modalContent={this.state.user}
          isDeleting={loading}
          />
          <UserModal 
            onChange={this.onChange} 
            showModal={showModal} 
            hideModal={this.closeModal} 
            user={ user } 
            handleSubmit={this.onSubmit}
            errors={errors}
            loading={loading}
            roles ={roles}
            handleUpload={this.handleUpload}
            image = {image}
            openFileDialog={this.openFileDialog}
            getImageRef ={this.getImageRef}
            imageLoading={imageLoading}
          />
        <div className={`${loading && 'blurred'} users-container`}>
        <button disabled={loading} onClick={() => this.showModal(user)} type="submit" className="button-right">
            Add User
        </button>
        <div className="top">
          {users.length ? users.map(user => <UserCard 
          showModal={this.showModal}
          key={user.id}
          user={user} displayDeleteModal={this.displayDeleteModal} 
          />) : <EmptyContent message="No Users Added Yet!" />}
        </div>
      </div>
      </React.Fragment>
    );
  }
}
export const mapStateToProps = ({ users }) => ({
  loading: users.loading,
  users: users.users,
  roles: users.roles
});
export default connect(mapStateToProps, {fetchUsers, createUser, updateUser, deleteUser, fetchUserRoles})(Users);
