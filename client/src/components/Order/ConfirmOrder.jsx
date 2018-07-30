import React, { Component } from 'react';
import { format } from 'date-fns';

import Meal from './Meal';
import { toast, ToastContainer } from 'react-toastify';

/* eslint-disable */

/**
 *
 *
 * @class ConfirmOrder
 * @extends {Component}
 */
class ConfirmOrder extends Component {

  confirmOrder = () => {
    this.props.orderMeal(this.props.mealSelected)
      .then(() => {
        toast.success(this.props.message, {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(() => {
        toast.error(this.props.message, {
          position: toast.POSITION.TOP_CENTER
        })
      });
  }

  render () {
    const { isModalOpen, toggleModal, menus, match, mealSelected } = this.props;
    let mainMeal;
    let firstAccompaniment;
    let secondAccompaniment;
    let date;
    const menu = menus.find(meals => meals.id === Number(match.params.id))
    if (menu) {
      mainMeal = menu.meal.main.find(meal => meal.id === mealSelected.mainMeal);
      firstAccompaniment= menu.meal.firstAccompaniment.find(meal => meal.id === mealSelected.firstAccompaniment);
      secondAccompaniment= menu.meal.secondAccompaniment.find(meal => meal.id === mealSelected.secondAccompaniment);
      date = menu.date;
    }
    return (
      <div id="myModal" className="modal" style={(isModalOpen) ? { display: 'block' } : { display: 'none' }}>
      <div className="modal-content">
          <ToastContainer />
        <div className="modal-header">
          <div className="header-title">CONFIRM ORDER</div>
          <div className="header-date">
            <p className="label date-label">Order Date:</p>
            <p className="order-date"> <b>{format(date, 'dddd d MMMM')}</b></p>
          </div>
          <div className="label order-details">Order Details</div>
        </div>
        <div className="menus-container">
        <div className="main-meal">
          <ul>
          {(mainMeal) ?
            <div>
              <div className="label meal-title">Main Meal</div>
              <Meal meal={mainMeal} shouldHaveCheckBox={false} />
            </div> : ''
          }
          {(firstAccompaniment) ?
            <div>
              <div className="meal-title">Accompaniment 1</div>
              <Meal meal={firstAccompaniment} shouldHaveCheckBox={false} />
            </div> : ''
          }
          {(secondAccompaniment) ?
            <div>
              <div className="meal-title">Accompaniment 2</div>
              <Meal meal={secondAccompaniment} shouldHaveCheckBox={false} />
            </div> : ''
          }
          </ul>
        </div>
        <div className="modal-footer">
        <div className="cta">
            <div className="float-left"></div>
            <div className="float-right">
              <div className="btn reset-order" onClick={toggleModal.bind(this)}>Cancel</div>
              <div className="btn submit-order" onClick={this.confirmOrder}>Confirm order</div>
            </div>
            </div>        
            </div>
          </div>
      </div>
    </div>
    )
  }
}

export default ConfirmOrder;