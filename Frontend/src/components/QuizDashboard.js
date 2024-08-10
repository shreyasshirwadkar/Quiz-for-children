import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { FaArrowLeft } from "react-icons/fa";
const QuizDashboard = () => {
  const { id } = useParams(); // Get quiz ID from URL parameters
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
          `http://localhost:8000/api/v1/question/Question/${id}`,
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
  }, [id]);

  const handleEditClick = (questionId) => {
    navigate(`/edit-question/${id}/${questionId}`);
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
          `http://localhost:8000/api/v1/question/deleteQuestion/${id}/${selectedQuestionId}`,
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
    navigate(`/add-question/${id}`);
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

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="relative p-6 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
    <div className="absolute top-4 left-4 flex items-center space-x-4">
       
        <button
          onClick={() => navigate("/quizzes")}
          className="text-blue-900 hover:text-black transition-shadow bg-zinc-200 rounded-lg p-2 mt-0 flex items-center justify-center"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-3 w-24 rounded-lg shadow-md hover:bg-red-600 transition"
      >
        Logout
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Quiz Questions
      </h2>
      <button
        onClick={handleAddQuestionClick}
        className="bg-green-500 text-white w-96 py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition font-bold text-lg mb-4 block mx-auto"
      >
        Add New Question
      </button>
      <div className="overflow-y-auto h-[calc(100vh-200px)]">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 pb-4">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="p-4 bg-white rounded-lg shadow-md space-y-4"
              >
                {question.question && (
                  <img
                    src={question.question}
                    alt="Question"
                    className="w-full h-44 object-contain rounded-md"
                  />
                )}
                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-2 border rounded-md text-center ${
                        option === question.correct
                          ? "bg-green-200"
                          : "bg-gray-100"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                  <button
                    onClick={() => handleEditClick(question._id)}
                    className="text-blue-500 hover:text-white transition bg-blue-200 px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    
                    <FaEdit size={20} /> 
                  </button>
                  <button
                    onClick={() => openModal(question._id)}
                    className="text-red-500 hover:text-white transition bg-red-200 px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-2xl font-bold text-gray-500 bg-white rounded-md">No questions available.</p>
          )}
        </div>
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
