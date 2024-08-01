import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/EditQuestion.css"; // Create a stylesheet for EditQuestion

const EditQuestion = () => {
  const { quizType, questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/question/${quizType}/${questionId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestion(data.question);
        setOptions(data.options);
      } catch (error) {
        console.error("Error fetching question details:", error);
        setError("Error fetching question details.");
      }
    };

    fetchQuestionDetails();
  }, [quizType, questionId]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/updateQues/${quizType}/${questionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, options }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate(`/quiz-dashboard/${quizType}`);
    } catch (error) {
      console.error("Error updating question:", error);
      setError("Error updating question.");
    }
  };

  return (
    <div className="edit-question-container">
      <h2>Edit Question</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
              required
            />
          ))}
        </div>
        <button type="submit" className="submit-button">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
