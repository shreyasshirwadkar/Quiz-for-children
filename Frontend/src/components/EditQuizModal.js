import React, { useState } from "react";
import "./styles/Modal.css";

const EditQuizModal = ({ isOpen, onClose, onConfirm, quizType }) => {
  const [newQuizName, setNewQuizName] = useState("");

  const handleInputChange = (e) => {
    setNewQuizName(e.target.value);
  };

  const handleConfirm = () => {
    if (newQuizName.trim() === "") {
      alert("Please enter a valid quiz name.");
      return;
    }
    onConfirm(quizType, newQuizName);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Quiz Name</h2>
        <input
          type="text"
          value={newQuizName}
          onChange={handleInputChange}
          placeholder="Enter new quiz name"
        />
        <div className="modal-buttons">
          <button onClick={handleConfirm} className="confirm-button">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuizModal;
