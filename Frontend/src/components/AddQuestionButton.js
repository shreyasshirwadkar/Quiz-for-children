// src/components/AddQuestionButton.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles/AddQuestionButton.css"; // Create this CSS file for styling

const AddQuestionButton = () => {
  return (
    <Link to="/auth" className="add-question-button">
      Add Question
    </Link>
  );
};

export default AddQuestionButton;
