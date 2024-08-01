import React from "react";
import "./styles/Modal.css"; // Assuming you have a CSS file for styling the modal

const Modal = ({ isOpen, onClose, onConfirm, quizType }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(quizType);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the quiz "{quizType}"?</p>
        <div className="modal-buttons">
          <button onClick={handleConfirm} className="confirm-button">
            Yes, Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
