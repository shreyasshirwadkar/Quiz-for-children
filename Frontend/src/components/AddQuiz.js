import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddQuiz.css";

const AddQuiz = () => {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", quizName);
    if (image) {
      formData.append("quizImage", image);
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/question/addQuizType",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/"); // Navigate back to the quizzes list page or wherever you'd like
    } catch (error) {
      console.error("Error adding quiz type:", error);
      setError("Error adding quiz type.");
    }
  };

  return (
    <div className="add-quiz-container">
      <h2>Add New Quiz Type</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quiz Type Name:</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quiz Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Quiz Type
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
