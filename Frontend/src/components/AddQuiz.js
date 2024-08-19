import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  FaArrowLeft } from "react-icons/fa";

const AddQuiz = () => {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", quizName);
    if (image) {
      formData.append("quizImage", image);
    }

    try {
      const response = await fetch(
        "https://quiz-for-children-1.onrender.com/api/v1/question/addQuizType",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate("/quizzes");
    } catch (error) {
      console.error("Error adding quiz type:", error);
      setError("Error adding quiz type.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-900 hover:text-black transition-shadow bg-zinc-200 rounded-lg p-2 mt-0 flex items-center justify-center"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Quiz Type</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quiz Type Name:</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quiz Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Quiz Type
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
