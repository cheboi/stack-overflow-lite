import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { StyledForm } from "./StyledForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("Login successfully");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (token) {
      navigate("/");
    }
  }, [auth, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(loginUser(user));
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <input type="email" placeholder="email" onChange={handleChange} />
        <input type="password" placeholder="password" onChange={handleChange} />
        <button onClick={handleSubmit}>
          {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
        </button>
        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}

        <div className="sign-up">
          don't have an account?
          <span onClick={() => navigate("/signup")}>Register Now</span>
        </div>
      </div>
    </>
  );
};

export default Login;
