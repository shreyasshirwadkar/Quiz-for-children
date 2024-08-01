import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/EditQuestion.css";

const EditQuestion = () => {
  const { quizType, questionId } = useParams();
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
          `http://localhost:8000/api/v1/question/Questioninfo/${quizType}/${questionId}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json(); // Access data directly
        console.log("Fetched data:", data); // Check data structure
        setOptions(data.options || ["", "", "", ""]);
        setCorrectOption(data.correct || "");
        setImagePreview(data.question || "");
      } catch (error) {
        console.error("Error fetching question details:", error);
        setError("Error fetching question details.");
      }
    };

    fetchQuestionDetails();
  }, [quizType, questionId]);

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
        `http://localhost:8000/api/v1/question/updateQues/${quizType}/${questionId}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate(`/quiz-dashboard/${quizType}`);
    } catch (error) {
      console.error("Error updating question:", error);
      setError("Error updating question.");
    }
  };

  return (
    <div className="edit-question-container">
      <h2>Edit Question</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option || ""}
              placeholder={`Option ${index + 1}`}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Option:</label>
          <select
            value={correctOption || ""}
            onChange={(e) => setCorrectOption(e.target.value)}
            required
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Question Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Question Preview"
              className="image-preview"
            />
          )}
        </div>
        <button type="submit" className="submit-button">
          Update Question
        </button>
      </form>
    </div>
  );
};

export default EditQuestion;
