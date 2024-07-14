import React, { useState } from "react";
import axios from "axios";
import "./styles/QuestionInput.css";
import { useNavigate } from "react-router-dom";


const QuestionInput = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [redirectToMenu, setRedirectToMenu] = useState(false); // State for redirection
  const [addAnotherQuestion, setAddAnotherQuestion] = useState(false); // State for adding another question

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("ques", file);
    formData.append("type", type);
    formData.append("opt", JSON.stringify(options));
    formData.append("correct", correctAnswer);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/question/postQuestion",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Question Added:", response.data);
      setMessage("Question added successfully!");
      setRedirectToMenu(true); // Set state to redirect after successful submission
    } catch (error) {
      console.error("Error adding question:", error);
      setMessage("Failed to add question. Please try again.");
    }
  };

  const handleAddAnother = () => {
    // Reset form fields and message
    setFile(null);
    setType("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setMessage("");
    setAddAnotherQuestion(true);
    setRedirectToMenu(false);  // Set state to allow adding another question
  };
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Redirect logic here, e.g., navigate to main menu route
    // Replace with your actual redirection mechanism (e.g., react-router's history.push)
    console.log("Redirecting to main menu...");
    setTimeout(() => {
      navigate("/");
    }, 10);    // Example redirect
    // history.push('/main-menu'); // Uncomment if using react-router, adjust route as needed
  };

  if (redirectToMenu) {
    return (
      <div className="question-input-container">
        <p>Question added successfully!</p>
        <button onClick={handleAddAnother}>Add Another Question</button>
        <button onClick={handleRedirect}>Go to Main Menu</button>
      </div>
    );
  }

  if (addAnotherQuestion) {
    // Reset form and allow adding another question
    return (
      <div className="question-input-container">
        <h2>Add Question</h2>
        <div className="question-block">
          <input
            type="text"
            placeholder="Question Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="question-block">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            accept=".jpg,.jpeg,.png,.gif"
            required
          />
        </div>

        {options.map((option, index) => (
          <div key={index} className="question-block">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}

        <div className="question-block">
          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  // Default view: Add question form
  return (
    <div className="question-input-container">
      <h2>Add Question</h2>
      <div className="question-block">
        <input
          type="text"
          placeholder="Question Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div className="question-block">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept=".jpg,.jpeg,.png,.gif"
          required
        />
      </div>

      {options.map((option, index) => (
        <div key={index} className="question-block">
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        </div>
      ))}

      <div className="question-block">
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuestionInput;
