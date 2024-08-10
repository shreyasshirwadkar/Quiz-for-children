import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {FaArrowLeft } from "react-icons/fa";


const EditQuestion = () => {
  const { id, questionId } = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/question/Questioninfo/${id}/${questionId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        console.log("Fetched data:", data);
        setOptions(data.options || ["", "", "", ""]);
        setCorrectOption(data.correct || "");
        setImagePreview(data.question || "");
      } catch (error) {
        console.error("Error fetching question details:", error);
        setError("Error fetching question details.");
      }
    };

    fetchQuestionDetails();
  }, [id, questionId]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("ques", file);
    }
    formData.append("opt", JSON.stringify(options));
    formData.append("correct", correctOption);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/updateQues/${id}/${questionId}`,
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
      console.error("Error updating question:", error);
      setError("Error updating question.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
    >
      {" "}
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-black transition-shadow mb-4 bg-bg-green-600 rounded-lg p-2 mt-0 flex items-center justify-center"
        >
          <FaArrowLeft size={30} />
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-5/6  overflow-y-auto ">
        <h2 className="text-2xl mb-4">Edit Question</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Options:</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option || ""}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                className="border border-gray-300 p-2 rounded mb-2 w-full"
              />
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correct Option:</label>
            <select
              value={correctOption || ""}
              onChange={(e) => setCorrectOption(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded w-full"
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Question Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Question Preview"
                className="mt-4 w-full h-48 object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Update Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
