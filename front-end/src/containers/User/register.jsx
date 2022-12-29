import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../components/error";
import Spinner from "../../components/spinner";
import { registerUser } from "../../features/authSlice";

import "./Login.css";

const Register = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/user-profile");
    if (success) navigate("/login");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };

  return (
    <div className="containier-login">
      <form onSubmit={handleSubmit(submitForm)} class="signContinue">
        <div className="welcome-sign">
          <h3>Lets Get Started</h3>
          <h5>Create Your Account</h5>
        </div>
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div className="form-control">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-input"
            {...register("username")}
            required
          />
        </div>

        <br />
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-input"
            {...register("email")}
            required
          />
        </div>
        <br />
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-input"
            {...register("password")}
            required
          />
        </div>
        <br />
        <div className="form-control">
          <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            {...register("confirmPassword")}
            required
          />
        </div>
        <br />
        <button type="submit" className="btnPrimary" disabled={loading}>
          {loading ? <Spinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
