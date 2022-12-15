import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Nav/Header";
import Home from "./containers/HomePage";
import Askquestion from "./containers/AskQuestions";
import Login from "./containers/User/Login";
import Register from "./containers/User/register";
import Answers from "./containers/Answers";
import Comment from "./containers/Comment";
import Profile from "./containers/Profile";
import { loadUser } from "./features/authSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

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
          <Route path="profile" element={<Profile />} />
          <Route path="answers/:id/comment" element={<Comment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
