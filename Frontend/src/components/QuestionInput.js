// src/components/QuestionInput.js
import React, { useState } from "react";
import axios from "axios";
import "./styles/QuestionInput.css";

const QuestionInput = () => {
  const [owner, setOwner] = useState(""); // Ideally, the owner should be fetched from the logged-in user's info
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct: "" },
  ]);

  const handleOptionChange = (index, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    const newQuestion = { owner, type, questions };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/questions",
        newQuestion
      );
      console.log("Question Added:", response.data);
      // Clear form fields after submission
      setType("");
      setQuestions([{ question: "", options: ["", "", "", ""], correct: "" }]);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="question-input-container">
      <h2>Add Question</h2>

      {questions.map((q, index) => (
        <div key={index} className="question-block">
          <input
            type="text"
            placeholder="Question Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="file"
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question = e.target.value;
              setQuestions(newQuestions);
            }}
          />
          {q.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(index, optionIndex, e.target.value)
              }
              className="option-input"
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correct}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].correct = e.target.value;
              setQuestions(newQuestions);
            }}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default QuestionInput;
