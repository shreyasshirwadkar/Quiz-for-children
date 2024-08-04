import React, { useState } from "react";

const EditQuizModal = ({ isOpen, onClose, onConfirm, quiz }) => {
  const [newQuizName, setNewQuizName] = useState(quiz ? quiz.name : "");
  const [imagePreview, setImagePreview] = useState(quiz ? quiz.imageUrl : null);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    setNewQuizName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (newQuizName.trim()) {
      onConfirm(quiz, newQuizName, imageFile);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Edit Quiz</h3>
        <input
          type="text"
          value={newQuizName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter new quiz name"
        />
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-36 object-cover rounded"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-1 px-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-1 px-3 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuizModal;
