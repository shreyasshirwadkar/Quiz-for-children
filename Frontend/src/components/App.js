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
        <Route path="/quiz/:quizType" element={<QuizDashboard />} />
        <Route path="/questioninput" element={<QuestionInput />} />
        {/* <Route path="/edit-question/:questionId" element={<QuestionInput />} /> Implement this route if you need it */}
        {/* <Route path="/add-question/:quizId" element={<QuestionInput />} /> Implement this route if you need it */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
