import Ratings from 'react-stars';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CollectedAction = ({ meal, showRatingModal }) => (
  <div className="card-action collected">
    <div className="item">
      <p className="sub-head">Status</p>
      <span className="heading">Collected</span>
    </div>
    <Fragment>
      <div className="item">
        <p className="sub-head">Rating</p>
        <Ratings
          value={meal.user_rating}
          color2="green"
          edit={false}
          name="rating"
        />
      </div>
      { meal && !meal.hasRated && (
      <div>
        <p className="sub-head">Rate this meal</p>
        <a
          className="button rate-button"
          tabIndex="0"
          role="button"
          name="rate-meal"
          onClick={() => showRatingModal(meal)}
        >RATE
        </a>
      </div>
      )}
    </Fragment>
  </div>
);

CollectedAction.propTypes = {
  meal: PropTypes.object,
  showRatingModal: PropTypes.func
};

export default CollectedAction;
