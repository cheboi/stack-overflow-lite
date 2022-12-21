import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Nav/Header";
import Home from "./containers/HomePage";
import Askquestion from "./containers/AskQuestions";
import Login from "./containers/User/Login";
import Register from "./containers/User/register";
import Answers from "./containers/Answers";
import Comment from "./containers/Comment";
import Profile from "./containers/Profile";
import ProtectedRoute from "./routing/protectedRoutes";
// import { loadUser } from "./features/authSlice";
import SearchPage from "./containers/HomePage/search";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser(null));
  // }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <div className="content-container">
          <Routes>
            <Route>
              <Route index element={<Home />} />
              <Route path="signin" element={<Login />} />
              <Route path="signup" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="answers" element={<Answers />} />
                <Route path="askquestion" element={<Askquestion />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="answers/comment" element={<Comment />} />
              <Route exact path="/search" element={<SearchPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
