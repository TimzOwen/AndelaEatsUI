/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {
  func, bool, string
} from 'prop-types';
import ReactStars from 'react-stars';
import Loader from './Loader/Loader';
/**
 *
 *
 * @class RatingModal
 * @extends {Component}
 */
class RatingModal extends Component {
  static initialState = () => ({
    selected: null,
    comment: '',
    rating: null,
    error: ''
  })

  constructor(props) {
    super(props);
    this.state = RatingModal.initialState();
  }

  /**
   *
   * @method handleCloseModal
   *
   * @memberOf RatingModal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState(RatingModal.initialState());
    this.props.closeModal();
  }

  /**
 *
 * @method handleRatings
 *
 * @param {number} rating
 *
 * @memberOf RatingModal
 *
 * @returns {void}
 */
  handleRatings = (rating) => {
    this.setState({ rating });
    this.removeErrorIcon('rating');
  }

  /**
 *
 * @method handleComment
 *
 * @param {object} event
 *
 * @memberOf RatingModal
 *
 * @returns {void}
 */
  handleComment = ({ target: { value } }) => {
    this.setState({ comment: value });
    this.removeErrorIcon('comment');
  }

  /**
 *
 * @method handleError
 *
 * @param {string} error
 *
 * @memberOf RatingModal
 *
 * @returns {void}
 */
  handleError = (error) => {
    this.setState({ error });
  }

  /**
 *
 * @method removeErrorIcon
 *
 * @param {string} error
 *
 * @memberOf RatingModal
 *
 * @returns {void}
 */
  removeErrorIcon = (error) => {
    if (this.state.error === error) {
      this.setState({ error: '' });
    }
  }

  /**
 *
 * 
 * @method handleForm
 *
 * @param {object} event
 *
 * @memberOf RatingModal
 *
 * @returns {void}
 */
  handleForm = (event) => {
    event.preventDefault();
    const { comment, rating } = this.state;
    if (!rating) return this.handleError('rating');
    if (!comment) return this.handleError('comment');
    const data = { rating, comment };
    this.props.handleSubmit(data);
    this.setState(RatingModal.initialState());
  }

  /**
   *
   *
   *
   * @memberOf RatingModal
   *
   * @returns {React.Node}
   */
  renderModalHeader = () => (
    <div className="modal-header">
      <div className="header-title">{this.props.modalTitle}</div>
      <div className="modal-close-button">
        <button
          type="button"
          title="close"
          tabIndex={0}
          className="btn-no-style"
          onClick={this.handleCloseModal}
        >
          <i className="fa fa-times close-btn" aria-hidden="true" />
        </button>
      </div>
    </div>
  )

  /**
 *
 *
 *
 * @memberOf RatingModal
 *
 * @returns {React.Node}
 */
  renderStars = () => {
    const { rating, error } = this.state;
    return (
      <div className="form-field-single modal-ratings">
        <ReactStars
          count={5}
          value={rating}
          onChange={this.handleRatings}
          size={24}
          color2="#ffd700"
        />
        {error === 'rating' && (
          <i
            className="fa fa-exclamation-circle text-error"
            aria-hidden="true"
            title="required"
          >
            &nbsp;Required
          </i>
        )}
      </div>
    );
  }

  /**
 *
 *
 *
 * @memberOf RatingModal
 *
 * @returns {React.Node}
 */
  renderTextArea = () => {
    const { comment, error } = this.state;
    const borderColor = error === 'comment' ? 'bc-red' : 'bc-grey';
    return (
      <div className="comment-area">
        <div className="text">Leave a comment<span>*</span></div>
        <textarea
          className={`modal-comment ${borderColor}`}
          value={comment}
          onChange={this.handleComment}
          name="comment"
          maxLength="200"
        />
        {error === 'comment' && (
          <i
            className="fa fa-exclamation-circle text-red"
            aria-hidden="true"
            title="required"
          >
            &nbsp;Required
          </i>
        )}
      </div>
    );
  }

  /**
 *
 *
 *
 * @memberOf RatingModal
 *
 * @returns {React.Node}
 */
  renderFooter = () => (
    <div className="modal-footer">
      <div className="button-container">
        <button
          type="button"
          className="grayed"
          onClick={this.handleCloseModal}
        >
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </div>
  )

  render() {
    const { isLoading, displayModal } = this.props;
    const display = displayModal ? 'block' : 'none';
    return (
      <div className="modal ratings-modal" style={{ display }}>
        <div className="modal-content">
          {this.renderModalHeader()}
          <div className="modal-body">
            {isLoading && <Loader />}
            <form onSubmit={this.handleForm} id="rating-form">
              {this.renderStars()}
              {this.renderTextArea()}
              {this.renderFooter()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RatingModal.propTypes = {
  closeModal: func,
  handleSubmit: func,
  displayModal: bool,
  modalTitle: string,
  isLoading: bool,
};

export default RatingModal;
