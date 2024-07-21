// src/components/AddQuestionButton.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles/AddQuestionButton.css"; // Create this CSS file for styling

const AddQuestionButton = () => {
  return (
    <Link to="/auth" className="add-question-button">
      Login
    </Link>
  );
};

export default AddQuestionButton;
