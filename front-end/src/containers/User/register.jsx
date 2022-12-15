import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth.id) {
      navigate("/cart");
    }
  }, [auth.id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(registerUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;