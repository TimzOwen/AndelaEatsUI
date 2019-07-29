import React from 'react';
import PropTypes from 'prop-types';
import EditAnOrder from '../EditOrder/EditOrder';

const Modal = ({
  displayModal,
  closeModal,
  deleteOrder,
  modalContent,
  modalTitle,
  tapOrder,
  edit,
}) => (
  <div
    className="modal"
    style={(displayModal)
      ? { display: 'block' } : { display: 'none' }}
  >
    { displayModal && !edit
      ? (
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">{modalTitle}</div>
          </div>
          <h3>
            {`${modalContent.mealItems[0].name},
             ${modalContent.mealItems[1].name} 
            and ${modalContent.mealItems[2].name}?`}
          </h3>
          <span className="warning">This cannot be undone</span>
          <div className="modal-footer">
            <div className="cta">
              <div className="float-right">
                <button
                  type="button"
                  className="grayed upper"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                { /* eslint-disable */}
                {modalTitle === 'Collect Order' ? (
                  <button
                    type="button"
                    className="fill upper delete-order"
                    onClick={() => tapOrder(modalContent)}
                    name="collect-order"
                  >
                    Collect
                  </button>) :
                    (
                      <button
                      type="button"
                      className="fill upper delete-order"
                      onClick={() => deleteOrder(modalContent.id)}
                    >
                    Delete
                    </button>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      )
      : modalContent && <EditAnOrder closeModal={closeModal} meal={modalContent}/>
    }
  </div>
)


Modal.propTypes = {
  displayModal: PropTypes.bool,
  closeModal: PropTypes.func,
  deleteOrder: PropTypes.func,
  modalContent: PropTypes.shape({
    mealItems: PropTypes.array
  }),
  modalTitle: PropTypes.string,
  tapOrder: PropTypes.func,
  editOrder: PropTypes.func,
  edit: PropTypes.bool,
};

export default Modal;