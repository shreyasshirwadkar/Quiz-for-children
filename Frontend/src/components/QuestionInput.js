import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/QuestionInput.css";

const QuestionInput = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [addAnotherQuestion, setAddAnotherQuestion] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("ques", file);
    formData.append("type", type);
    formData.append("opt", JSON.stringify(options));
    formData.append("correct", correctAnswer);

    try {
      const response = await axios.post(
        "https://quiz-for-children-1.onrender.com/api/v1/question/postQuestion",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("Question added successfully!");
        if (addAnotherQuestion) {
          setFile(null);
          setType("");
          setOptions(["", "", "", ""]);
          setCorrectAnswer("");
        } else {
          navigate("/menu"); // Navigate to /menu on success
        }
      } else {
        setMessage("Failed to add question. Please try again.");
      }
    } catch (error) {
      setMessage("Error adding question.");
    }
  };

  return (
    <div className="question-input-container">
      <h2>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quiz Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter quiz type"
            required
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Option:</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          >
            <option value="" disabled>Select correct option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Question Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={addAnotherQuestion}
              onChange={() => setAddAnotherQuestion(!addAnotherQuestion)}
            />
            Add another question
          </label>
        </div>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default QuestionInput;
