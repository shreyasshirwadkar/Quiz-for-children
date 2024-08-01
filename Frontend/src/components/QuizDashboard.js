import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/QuizDashboard.css"; // Create a stylesheet for QuizDashboard
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons

const QuizDashboard = () => {
  const { quizType } = useParams(); // Get quiz type from URL parameters
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/question/Question/${quizType}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizType]); // Re-fetch questions when quizType changes

  const handleEditClick = (questionId) => {
    navigate(`/edit-question/${quizType}/${questionId}`); // Example edit route
  };

  const handleDeleteClick = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/deleteQuestion/${quizType}/${questionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleAddQuestionClick = () => {
    navigate(`/add-question/${quizType}`); // Example add question route
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-dashboard-container">
      <h2>Quiz Questions</h2>
      <button onClick={handleAddQuestionClick} className="add-question-button">
        Add New Question
      </button>
      <div className="questions-list">
        {questions.length ? (
          questions.map((question) => (
            <div key={question._id} className="question-item">
              {question.question && <img src={question.question} alt="Question" className="question-image" />}
              <div className="question-details">
                <div className="question-options">
                  {question.options.map((option, index) => (
                    <div key={index} className="question-option">
                      {option}
                    </div>
                  ))}
                </div>
                <div className="question-actions">
                  <FaEdit onClick={() => handleEditClick(question._id)} className="action-icon" />
                  <FaTrash onClick={() => handleDeleteClick(question._id)} className="action-icon" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizDashboard;
