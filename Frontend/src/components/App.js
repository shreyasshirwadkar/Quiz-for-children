import "./styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import Main from "./Main";
import Quiz from "./Quiz";
import Result from "./Result";
import Login from "./Login";
import Signup from "./Signup";
import QuestionInput from "./QuestionInput";
import AuthPage from "./AuthPage";

//react routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },
  {
    path: "/quiz",
    element: <Quiz></Quiz>,
  },
  {
    path: "/result",
    element: <Result></Result>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/Signup",
    element: <Signup></Signup>,
  },
  {
    path: "/QuestionInput",
    element: <QuestionInput></QuestionInput>,
  },
  {
    path: "/auth",
    element: <AuthPage></AuthPage>,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
