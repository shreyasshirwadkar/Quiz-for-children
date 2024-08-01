import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/QuizzesList.css";

const QuizzesList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/question/QuizTypes", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error fetching quizzes.");
        }

        const data = await response.json();

        const quizzesArray = Object.entries(data.data).map(([type, questions]) => ({
          type,
          name: type, // Assuming you want to use the type as the name for now
          questions,
        }));

        setQuizzes(quizzesArray);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Error fetching questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizType) => {
    navigate(`/quiz-dashboard/${quizType}`); // Updated path
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quizzes-list-container">
      <h2>Select Quiz</h2>
      <div className="quizzes-list">
        {quizzes.length ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.type}
              className="quiz-item"
              onClick={() => handleQuizClick(quiz.type)}
            >
              <h3>
                {quiz.name} ({quiz.questions} questions)
              </h3>
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
