// src/components/QuizzesList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/QuizzesList.css";

const QuizzesList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/QuizTypes");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Error fetching quizzes.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizType) => {
    navigate(`/quiz/${quizType}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quizzes-list-container">
      <h2>Select Quiz</h2>
      <div className="quizzes-list">
        {quizzes.length ? (
          quizzes.map((quiz) => (
            <div key={quiz.type} className="quiz-item" onClick={() => handleQuizClick(quiz.type)}>
              <h3>{quiz.title}</h3>
            </div>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizzesList;
