import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/QuizzesList.css";
import Modal from "./Modal"; // Import the Modal component
import EditQuizModal from "./EditQuizModal";
const QuizzesList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [quizToEdit, setQuizToEdit] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/question/QuizTypes",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching quizzes.");
        }

        const data = await response.json();

        const quizzesArray = Object.entries(data.data).map(
          ([type, questions]) => ({
            type,
            name: type, // Assuming you want to use the type as the name for now
            questions,
          })
        );

        setQuizzes(quizzesArray);
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
    navigate(`/quiz-dashboard/${quizType}`);
  };

  const handleAddQuizClick = () => {
    navigate("/add-quiz"); // Navigate to the add quiz page
  };

  const openDeleteModal = (quizType) => {
    setQuizToDelete(quizType);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  const openEditModal = (quizType) => {
    setQuizToEdit(quizType);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setQuizToEdit(null);
  };

  const handleDeleteQuiz = async (quizType) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/deleteQuiz/${quizType}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error deleting quiz.");
      }

      // Update the state to remove the deleted quiz
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.type !== quizType)
      );
    } catch (error) {
      console.error("Error deleting quiz:", error);
      setError("Error deleting quiz.");
    } finally {
      closeDeleteModal();
    }
  };

  const handleEditQuizName = async (quizType, newQuizName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/editQuizType/${quizType}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: newQuizName }),
        }
      );

      if (!response.ok) {
        throw new Error("Error editing quiz name.");
      }

      // Update the state to reflect the edited quiz name
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.type === quizType ? { ...quiz, name: newQuizName } : quiz
        )
      );
    } catch (error) {
      console.error("Error editing quiz name:", error);
      setError("Error editing quiz name.");
    } finally {
      closeEditModal();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="quizzes-list-container">
      <h2>Select Quiz</h2>
      <button onClick={handleAddQuizClick} className="add-quiz-button">
        Add New Quiz
      </button>
      <div className="quizzes-list">
        {quizzes.length ? (
          quizzes.map((quiz) => (
            <div key={quiz.type} className="quiz-item">
              <div onClick={() => handleQuizClick(quiz.type)}>
                <h3>
                  {quiz.name} ({quiz.questions} questions)
                </h3>
              </div>
              <button
                onClick={() => openEditModal(quiz.type)}
                className="edit-quiz-button"
              >
                Edit Quiz
              </button>
              <button
                onClick={() => openDeleteModal(quiz.type)}
                className="delete-quiz-button"
              >
                Delete Quiz
              </button>
            </div>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteQuiz}
        quizType={quizToDelete}
      />
      <EditQuizModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onConfirm={handleEditQuizName}
        quizType={quizToEdit}
      />
    </div>
  );
};

export default QuizzesList;
