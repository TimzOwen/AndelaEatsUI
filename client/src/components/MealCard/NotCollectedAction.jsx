import React from 'react';
import PropTypes from 'prop-types';
import { isFuture } from 'date-fns';


const NotCollectedAction = ({
  meal, showModal, edit
}) => (
  <div className="card-action not-collected">
    <div>
      <p className="sub-head">Status</p>
      <span className="heading">Not Collected</span>
    </div>
    <div className="item">
      <p className="sub-head">Order options</p>
      <div className="button-group">
        {isFuture(new Date(meal.dateBookedFor))
          ? (
            <React.Fragment>
              <a
                role="button"
                className="button test rate-button"
                tabIndex="0"
                onClick={() => showModal(meal, '', true)}
              > Edit
              </a>
              <a
                role="button"
                className="button test"
                tabIndex="0"
                onClick={() => showModal(meal, 'Delete Order')}
              > Delete
              </a>
            </React.Fragment>
          )
          : (
            <a
              className="button test rate-button"
              role="button"
              tabIndex="0"
              onClick={() => showModal(meal, 'Collect Order')}
            > Collect
            </a>
          )
        }
      </div>
    </div>
  </div>
);

NotCollectedAction.propTypes = {
  meal: PropTypes.shape({
    mealItems: PropTypes.array,
    rating: PropTypes.number
  }),
  showModal: PropTypes.func,
  edit: PropTypes.bool,
};

export default NotCollectedAction;
