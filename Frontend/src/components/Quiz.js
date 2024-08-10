import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Questions from "./Questions";
import { FaHome } from "react-icons/fa"; // Import Font Awesome home icon

export default function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/question/getQuestion/${id}`
      );

      if (response.data.data && response.data.data.questionWithoutCorrect) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          response.data.data.questionWithoutCorrect,
        ]);
      } else {
        throw new Error("No question found in response.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

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
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <Link
        to="/"
        className="absolute top-4 left-4 text-blue-900 hover:text-black transition shadow-md bg-zinc-200	 rounded-lg py-2 px-2"
      >
        <FaHome size={40} />
      </Link>
      {loading && questions.length === 0 ? (
        <p className="text-gray-500">Loading questions...</p>
      ) : currentQuestion ? (
        <>
          <Questions question={currentQuestion} />
          <div className="flex mt-4 space-x-4 ">
            <button
              className={`py-2 px-4 rounded-lg transition-all duration-200 ${
                currentQuestionIndex === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-200 text-white hover:bg-blue-300"
              }`}
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-4xl bg-white py-2 px-2 font-bold">No questions available.</p>
      )}
    </div>
  );
}
