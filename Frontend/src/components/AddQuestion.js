import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {  FaArrowLeft } from "react-icons/fa";

const AddQuestion = () => {
  const { id } = useParams(); // Extract quizType from URL
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState(""); // State for storing quiz name
  const [questionImage, setQuestionImage] = useState(null);
  const [questionImagePreview, setQuestionImagePreview] = useState(null);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Quiz type is not defined.");
      return;
    }

    const fetchQuizInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/question/quizName/${id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setQuizName(result.data); // Set quiz name from the data field
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error fetching quiz info:", error);
        setError("Error fetching quiz info.");
      }
    };

    fetchQuizInfo();
  }, [id]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setQuestionImage(file);
    setQuestionImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("ques", questionImage);
    formData.append("opt", JSON.stringify(options));
    formData.append("correct", correctAnswer);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/postQuestion/${id}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate(`/quiz-dashboard/${id}`);
    } catch (error) {
      console.error("Error adding question:", error);
      setError("Error adding question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
      <div className="absolute top-4 left-4 flex items-center space-x-4">
       
       <button
         onClick={() => navigate(-1)}
         className="text-blue-900 hover:text-black transition-shadow bg-zinc-200 rounded-lg p-2 mt-0 flex items-center justify-center"
       >
         <FaArrowLeft size={30} />
       </button>
     </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-5/6 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Add New Question
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
     
        <h3 className="text-xl font-bold mb-4 text-gray-700">
          {quizName || "Loading quiz name..."}
        </h3>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Upload Question Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded-md"
            />
            {questionImagePreview && (
              <div className="mt-4">
                <img
                  src={questionImagePreview}
                  alt="Question Preview"
                  className="w-48 h-48 object-cover rounded-md mx-auto"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Options:</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="w-full p-2 border rounded-md mb-2"
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correct Answer:</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg shadow-md w-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition text-white`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
