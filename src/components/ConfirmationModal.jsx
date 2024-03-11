import './ConfirmationModal.css';
import PropTypes from 'prop-types';

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onConfirm} className="confirm">
            Yes
          </button>
          <button onClick={onCancel} className="cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
