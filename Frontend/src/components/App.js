import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import AddQuestion  from "./AddQuestion";
import EditQuestion from "./EditQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz/:type" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quizzes" element={<QuizzesList />} />
        <Route
          path="/quiz-dashboard/:quizType"
          element={<QuizDashboard />}
        />{" "}
        {/* Updated path */}
        <Route path="/questioninput" element={<QuestionInput />} />
        <Route path="/add-question/:quizType" element={<AddQuestion />} />
        <Route
          path="/edit-question/:quizType/:questionId"
          element={<EditQuestion />}
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
