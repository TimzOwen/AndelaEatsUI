import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { fetchMealRatings } from '../../actions/admin/mealRatingActions';

import CollectedAction from './CollectedAction';
import NotCollectedAction from './NotCollectedAction';

export const MealCard = ({ showModal, meal, showRatingModal }) => {
  const { id, dateBookedFor, mealItems, orderStatus } = meal;
  return( 
    <div className="card-container">
      <div className="card-image" style={{ backgroundImage: `url(${mealItems[0].image})`}}>
        <p className={`order-id ${orderStatus === 'collected' ?
          'collected' : orderStatus === 'booked' ?
          'not-collected' : 'cancelled'}`}
        >
          {`#${id}`}
        </p>
      </div>
      <div>
        <div className="card-details">
          <div className="main">
            <p 
            className="heading">
            {`${mealItems[0].name}, ${mealItems[1].name}, ${mealItems[2].name}`}
            </p>
            <p>
              <span className="sub-head">Order date&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="heading">{format(dateBookedFor, "dddd MMMM D")}</span>
            </p>
          </div>
  
          {orderStatus !== "booked"
            ? (
                <CollectedAction
                id={id}
                meal={meal}
                showRatingModal={showRatingModal}
                />
              )
            : (
              <NotCollectedAction
                id={id}
                meal={meal}
                showModal={showModal}
              />
            )}
        </div>
          </div>
    </div>
  );
};

MealCard.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number,
    isCollected: PropTypes.bool,
    dateBookedFor: PropTypes.string,
    mealItems: PropTypes.array,
    imageUrl: PropTypes.string,
    orderStatus: PropTypes.string,
    rating: PropTypes.number
  }),
  date: PropTypes.string,
  showModal: PropTypes.func,
  fetchMealRatings: PropTypes.func,
};

export const mapStateToProps = ({ allRatings, userReducer }, ownProps) => {
  const date = format(ownProps.meal.dateBookedFor, 'YYYY-MM-DD');
  return {
  ratedMeal: allRatings.ratingList.filter(item => format(item.date, 'YYYY-MM-DD') === date)[0],
  userID: userReducer.id
  }
}

export default connect(mapStateToProps, { fetchMealRatings })(MealCard);
