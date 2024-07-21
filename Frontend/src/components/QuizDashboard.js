// src/components/QuizDashboard.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/QuizDashboard.css";

const QuizDashboard = () => {
  const { quizType } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Question/${quizType}`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizType]);

  const handleEditClick = (questionId) => {
    navigate(`/edit-question/${quizType}/${questionId}`);
  };

  const handleDeleteClick = async (questionId) => {
    try {
      await axios.get(`http://localhost:8000/api/v1/deleteQuestion/${quizType}/${questionId}`);
      // Refresh the questions list after deleting
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleAddQuestionClick = () => {
    navigate(`/add-question/${quizType}`);
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
            <div key={question.id} className="question-item">
              <h3>{question.text}</h3>
              <button onClick={() => handleEditClick(question.id)}>Edit</button>
              <button onClick={() => handleDeleteClick(question.id)}>Delete</button>
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
