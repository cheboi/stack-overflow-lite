import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./Login.module.css";

import { login } from "../../features/authSlice";
import { clearMessage } from "../../features/messageSlice";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className={style.signContinue}>
      <div className={style.cardcontainer}>
        <h2>welcome back!</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className={style.formGroup}>
              <label htmlFor="username">Username</label>
              <br />
              <Field
                name="username"
                type="text"
                className={style.descriptionField}
                placeholder="User Name"
              />
              <ErrorMessage
                name="username"
                component="div"
                className={style.alertDanger}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label> <br />
              <Field
                name="password"
                type="password"
                className={style.descriptionField}
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={style.alertDanger}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className={style.btnPrimary}
                disabled={loading}
              >
                {loading && <span className=""></span>}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
