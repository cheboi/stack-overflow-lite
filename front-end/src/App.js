import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Nav/Header";
import Home from "./containers/HomePage";
import Askquestion from "./containers/AskQuestions";
import Login from "./containers/User/Login";
import Register from "./containers/User/signUp";
import Answers from "./containers/Answers";
import Comment from "./containers/Comment"

//E:\theJitu\the-final\stack-overflow-lite\front-end\src\containers\Answers

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="askquestion" element={<Askquestion />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="answers" element={<Answers />} />
          <Route path="answers/:id/comment" element={<Comment />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
