import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../components/error";
import Spinner from "../../components/spinner";
import { registerUser } from "../../features/authSlice";

import "./signup.css";

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
    <form onSubmit={handleSubmit(submitForm)} class="cardContainer">
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="formControl" style={{ paddingTop: "90px" }}>
        <h3>lets get started </h3>
        <br />
        <h5>create account</h5>
        <br />
        <label htmlFor="username">User Name</label> <br />
        <input
          type="text"
          className="form-input"
          {...register("username")}
          required
        />
      </div>

      <br />
      <div className="formControl">
        <label htmlFor="email">Email</label> <br />
        <input
          type="email"
          className="form-input"
          {...register("email")}
          required
        />
      </div>
      <br />
      <div className="formControl">
        <label htmlFor="password">Password</label> <br />
        <input
          type="password"
          className="form-input"
          {...register("password")}
          required
        />
      </div>
      <br />
      <div className="formControl">
        <label htmlFor="email">Confirm Password</label> <br />
        <input
          type="password"
          className="form-input"
          {...register("confirmPassword")}
          required
        />
      </div>
      <br />
      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner /> : "Register"}
      </button>
    </form>
  );
};

export default Register;
