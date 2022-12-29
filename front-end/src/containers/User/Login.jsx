import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/authSlice";
import { useEffect } from "react";
import Error from "../../components/error";
import Spinner from "../../components/spinner";

import "./Login.css";

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="signContinue">
      <div className="welcome-sign">
        <h3>Welcome back!</h3>
        <h5 style={{ color: "#0E4BE8" }}>Signin to continue..</h5>
      </div>
      {error && <Error>{error}</Error>}
      <div className="form-group">
        <label htmlFor="email">User email</label>
        <input
          type="email"
          className="descriptionField"
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register("password")}
          required
        />
      </div>
      <button type="submit" className="btnPrimary" disabled={loading}>
        {loading ? <Spinner /> : "Login"}
      </button>
      <div className="welcome-sign">
        <h5>You do not have an account?</h5>
        <Link
          to="/signup"
          style={{
            color: "#1F456E",
            textDecoration: "non",
            left: 10,
            paddingLeft: "300px",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Login;
