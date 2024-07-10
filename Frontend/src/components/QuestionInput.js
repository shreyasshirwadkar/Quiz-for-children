import React, { useState } from "react";
import axios from "axios";
import "./styles/QuestionInput.css";

const QuestionInput = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", file); // 'question' should match the field name expected by multer

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/question/postQuestion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Question Added:", response.data);
      setMessage("Question added successfully!"); // Set success message
    } catch (error) {
      console.error("Error adding question:", error);
      setMessage("Failed to add question. Please try again."); // Set error message
    }
  };

  return (
    <div className="question-input-container">
      <h2>Add Question</h2>

      <div className="question-block">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept=".jpg,.jpeg,.png,.gif"
          required
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuestionInput;
