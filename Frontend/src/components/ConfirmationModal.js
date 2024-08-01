// ConfirmationModal.js
import React from 'react';
import './styles/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal-content">
        <h3>Are you sure you want to delete this question?</h3>
        <div className="confirmation-modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onClose} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
