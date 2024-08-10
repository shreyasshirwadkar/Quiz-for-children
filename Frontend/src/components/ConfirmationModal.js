import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this question?</h3>
        <div className="flex justify-around space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
