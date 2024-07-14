import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Main.css";
import quizTopics from "../database/quizTopicData.js";
import AddQuestionButton from "./AddQuestionButton";

export default function Main() {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleQuizClick = (path) => {
    navigate(path); // Use navigate() instead of history.push()
  };

  return (
    <div className="main-container">
      <h1 className="page-title">Select Quiz</h1>
      <div className="quiz-container">
        {quizTopics.map((quiz) => (
          <div key={quiz.id} className="quiz-item" onClick={() => handleQuizClick(quiz.path)}>
            <img src={quiz.imgSrc} alt={quiz.alt} />
          </div>
        ))}
      </div>
      <AddQuestionButton />
    </div>
  );
}
