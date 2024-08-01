import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Main.css";
import AddQuestionButton from "./AddQuestionButton";

const Main = () => {
  const navigate = useNavigate();
  const [quizTopics, setQuizTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizTopics = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/question/showAllQuizType",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching quiz types.");
        }

        const data = await response.json();
        setQuizTopics(data.data);
      } catch (error) {
        console.error("Error fetching quiz types:", error);
        setError("Error fetching quiz types.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizTopics();
  }, []);

  const handleQuizClick = (type) => {
    navigate(`/quiz/${type}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-container">
      <h1 className="page-title">Select Quiz</h1>
      <div className="quiz-container">
        {quizTopics.length ? (
          quizTopics.map((quiz) => (
            <div
              key={quiz._id}
              className="quiz-item"
              onClick={() => handleQuizClick(quiz.type)}
            >
              <img src={quiz.quizTypeUrl} alt={quiz.type} className="quiz-image" />
              <h3>{quiz.type}</h3>
            </div>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </div>
      <AddQuestionButton />
    </div>
  );
};

export default Main;
