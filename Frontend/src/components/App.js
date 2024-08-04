import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.css";

// Import components
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import Login from "./Login";
import Signup from "./Signup";
import QuestionInput from "./QuestionInput";
import AuthPage from "./AuthPage";
import QuizzesList from "./QuizzesList";
import QuizDashboard from "./QuizDashboard";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import AddQuiz from "./AddQuiz"; // Adjust import as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz/:id" element={<Quiz />} /> {/* Changed 'type' to 'id' */}
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quizzes" element={<QuizzesList />} />
        <Route path="/quiz-dashboard/:id" element={<QuizDashboard />} /> {/* Changed 'type' to 'id' */}
        <Route path="/questioninput" element={<QuestionInput />} />
        <Route path="/add-question/:id" element={<AddQuestion />} /> {/* Changed 'quizType' to 'id' */}
        <Route path="/edit-question/:id/:questionId" element={<EditQuestion />} /> {/* Changed 'quizType' to 'id' */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
