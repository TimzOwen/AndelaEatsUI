import React from 'react';
import ReactStars from 'react-stars';
import { 
  func, bool, string, object, number
} from 'prop-types';
import { format } from 'date-fns';

const RatingModal = ({
  displayModal,
  hideModal,
  modalContent,
  ratingChanged,
  newRating,
  textArea,
  onChange,
  handleSubmit
}) => (
  <div
    className="modal"
    style={displayModal ? { display: "block" } : { display: "none" }}
  >
    {displayModal ? (
      <div className="rating-modal-content">
        <div className="rating-modal-wrapper">
          <div className="rating-modal-header">
            <div className="rating header-title">
                  Rate Meal for { format(modalContent.dateBookedFor, 'dddd, Do MMMM YYYY') }
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="average-rating">
              <ReactStars
                value={newRating}
                count={5}
                size={20}
                color2="#54a61e"
                half={false}
                onChange={ratingChanged}
              />
              <div className="text">Average Rating</div>
              <span className="validate-rating">
                  * Required
              </span>
            </div>
            <div className="comment-area">
              <div className="text">Leave a comment</div>
              <textarea
                className="comment-textarea"
                value={textArea}
                onChange={onChange}
                name="textArea"
                maxLength="200"
              />
              <span className="validate-rating">
                  * Required
              </span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="grayed upper"
                onClick={hideModal}
              >
                  Cancel
              </button>
              <button
                type="submit"
                className="submit-comment"
              >
                  Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null}
  </div>
);

RatingModal.propTypes = {
  displayModal: bool,
  hideModal: func,
  modalContent: object,
  handleSubmit: func,
  onChange: func,
  newRating: number
};


export default RatingModal;