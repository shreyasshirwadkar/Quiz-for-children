import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/QuizDashboard.css"; // Existing stylesheet
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import ConfirmationModal from "./ConfirmationModal"; // Correct default import

const QuizDashboard = () => {
  const { quizType } = useParams(); // Get quiz type from URL parameters
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/question/Question/${quizType}`,
          {
            credentials: "include",
          }
        );

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

  const openModal = (questionId) => {
    setSelectedQuestionId(questionId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedQuestionId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedQuestionId) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/question/deleteQuestion/${quizType}/${selectedQuestionId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q._id !== selectedQuestionId)
        );
      } catch (error) {
        console.error("Error deleting question:", error);
        setError("Error deleting question.");
      } finally {
        closeModal();
      }
    }
  };

  const handleAddQuestionClick = () => {
    navigate(`/add-question/${quizType}`); // Example add question route
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/logoutUser",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-dashboard-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <h2>Quiz Questions</h2>
      <button onClick={handleAddQuestionClick} className="add-question-button">
        Add New Question
      </button>
      <div className="questions-list">
        {questions.length ? (
          questions.map((question) => (
            <div key={question._id} className="question-item">
              {question.question && (
                <img
                  src={question.question}
                  alt="Question"
                  className="question-image"
                />
              )}
              <div className="question-details">
                <div className="question-options">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`question-option ${
                        option === question.correct ? "correct-answer" : ""
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="question-actions">
                  <FaEdit
                    onClick={() => handleEditClick(question._id)}
                    className="action-icon"
                  />
                  <FaTrash
                    onClick={() => openModal(question._id)}
                    className="action-icon"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default QuizDashboard;
