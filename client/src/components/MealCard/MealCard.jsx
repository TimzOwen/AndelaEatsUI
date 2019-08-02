import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { fetchMealRatings } from '../../actions/admin/mealRatingActions';

import CollectedAction from './CollectedAction';
import NotCollectedAction from './NotCollectedAction';

export class MealCard extends Component  {
  state = {
    meal: null
  }
  componentDidMount() {
    const {fetchMealRatings, userID} = this.props;
    fetchMealRatings(format(this.props.meal.dateBookedFor, 'YYYY-MM-DD'), userID)
      .then(() => {
        this.setState(prevProps => ({
          meal: prevProps.meal
        }))
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ratedMeal && prevProps.ratedMeal !== this.props.ratedMeal) {
      const mainMeal = this.props.meal.mealItems.find(meal => meal.mealType === 'main');
      const ratedMeal = this.props.ratedMeal && 
        this.props.ratedMeal.result.find(meal => meal.mainMeal == mainMeal.name);
        this.setState({
          meal: {...prevState.meal,
            user_rating: ratedMeal && ratedMeal.overallRating,
           hasRated:true
          }
        })
     }
  }
  render() {
    const { meal: { id, dateBookedFor, 
      mealItems, 
      orderStatus }, 
      showModal, 
      meal,
      showRatingModal} = this.props
      return ( 
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
                      meal={this.state.meal ?this.state.meal : meal }
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
  }
}

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
