import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [quizTopics, setQuizTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizTopics = async () => {
      try {
        const response = await fetch(
          "https://quiz-for-children-1.onrender.com/api/v1/question/showAllQuizType",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching quiz types.");
        }

        const data = await response.json();
        setQuizTopics(data.data);
      } catch (error) {
        console.error("Error fetching quiz types:", error);
        setError("Error fetching quiz types.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizTopics();
  }, []);

  const handleQuizClick = async (type) => {
    try {
      const response = await fetch(
        `https://quiz-for-children-1.onrender.com/api/v1/question/getQuizTypeId/${type}`
      );

      if (!response.ok) {
        throw new Error("Error fetching quiz type ID.");
      }

      const data = await response.json();
      const quizTypeId = data.data; // The ID is directly in data.data
      navigate(`/quiz/${quizTypeId}`); // Navigate using quiz type ID
    } catch (error) {
      console.error("Error fetching quiz type ID:", error);
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-white text-center">{error}</p>;

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('path/to/your/background-image.jpg')" }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
        <Link to="/auth" className="absolute top-4 right-4 bg-blue-500 text-white text-xl font-bold py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors duration-300">
  Login
</Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-8 bg-green-900 rounded-lg py-4 px-4">Select a Quiz</h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
            {quizTopics.length ? (
              quizTopics.map((quiz) => (
                <div
                  key={quiz._id}
                  className="bg-white p-4 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleQuizClick(quiz.type)}
                >
                  <img
                    src={quiz.quizTypeUrl}
                    alt={quiz.type}
                    className="w-full h-40 object-cover rounded-md mb-4 "
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {quiz.type}
                  </h3>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-white">
                No quizzes available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
