import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Questions from "./Questions";

export default function Quiz() {
  const { type } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/v1/question/getQuestion/${type}`);
      setQuestions((prevQuestions) => [...prevQuestions, response.data.data.questionWithoutCorrect]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching question:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [type]);

  const handleNext = async () => {
    if (currentQuestionIndex === questions.length - 1) {
      await fetchQuestion();
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      {loading && questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : currentQuestion ? (
        <>
          <Questions question={currentQuestion} />
          <div className="grid">
            <button className="btn prev" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Prev
            </button>
            <button className="btn next" onClick={handleNext}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}