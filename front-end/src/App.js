import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Nav/Header";
import Home from "./containers/HomePage";
import Askquestion from "./containers/AskQuestionForm";
import Login from "./containers/User/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="askquestion" element={<Askquestion />} />
          <Route path="signin" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
