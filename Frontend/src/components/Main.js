import React from "react";
import { Link } from "react-router-dom";
import "./styles/Main.css";
import quizTopics from "../database/quizTopicData.js";
import AddQuestionButton from "./AddQuestionButton"; // Import the AddQuestionButton

export default function Main() {
  return (
    <div className="main-container">
      <h1 className="page-title">Select Quiz</h1>
      <div className="quiz-container">
        {quizTopics.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <Link to={quiz.path}>
              <img src={quiz.imgSrc} alt={quiz.alt} />
            </Link>
          </div>
        ))}
      </div>
      <AddQuestionButton /> {/* Add the button to the main page */}
    </div>
  );
}
