import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../features/authSlice";
import { clearMessage } from "../../features/messageSlice";

import classes from "./signup.module.css";

const Register = () => {
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    fisrtname: Yup.string().required("Your first Name is required"),
    lastname: Yup.string().required("Your last Name is required"),
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { firstname, lastname, username, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ firstname, lastname, username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <>
      <div className={classes.signUpForm}>
        <div className={classes.cardContainer}>
          <h2>Let’s get started</h2>
          <h5>create your Acoount</h5>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className={classes.formGroup}>
                    <label htmlFor="firstname">First Name</label>
                    <br />
                    <Field
                      name="firstname"
                      type="text"
                      className={classes.formControl}
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <br />
                    <Field
                      name="lastname"
                      type="text"
                      className={classes.formControl}
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="alert-danger"
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <label htmlFor="username">Username</label>
                    <br />
                    <Field
                      name="username"
                      type="text"
                      className={classes.formControl}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <br />
                    <Field
                      name="email"
                      type="email"
                      className={classes.formControl}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <br />
                    <Field
                      name="password"
                      type="password"
                      className={classes.formControl}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className={classes.btnPrimary}>
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>

        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
