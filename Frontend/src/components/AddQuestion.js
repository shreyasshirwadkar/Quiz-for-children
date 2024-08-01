import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/AddQuestion.css"; // Create a stylesheet for AddQuestion

const AddQuestion = () => {
  const { quizType } = useParams();
  const navigate = useNavigate();
  const [questionImage, setQuestionImage] = useState(null);
  const [questionImagePreview, setQuestionImagePreview] = useState(null);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(""); // Update state to hold selected option
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setQuestionImage(file);
    setQuestionImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    const formData = new FormData();
    formData.append("ques", questionImage);
    formData.append("opt", JSON.stringify(options)); // Stringify options array
    formData.append("correct", correctAnswer); // Send the selected correct answer

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/postQuestion/${quizType}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate(`/quiz-dashboard/${quizType}`);
    } catch (error) {
      console.error("Error adding question:", error);
      setError("Error adding question.");
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  return (
    <div className="add-question-container">
      <h2>Add New Question</h2>
      <h3>Quiz Type: {quizType}</h3>
      {error && <p className="error">{error}</p>}
      <button
        onClick={() => navigate(`/quiz-dashboard/${quizType}`)}
        className="back-button"
      >
        Back to Dashboard
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Question Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {questionImagePreview && (
            <div className="image-preview">
              <img
                src={questionImagePreview}
                alt="Question Preview"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          >
            <option value="">Select correct answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Add Question"}
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
