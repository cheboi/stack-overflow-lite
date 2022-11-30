import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./Login.module.css";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const signInValidation = Yup.object({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  return (
    <div classNae="sign-continue">
      <h1>Welcome back!</h1>
      <h4 style={{ color: "#0E4BE8" }}>Sign in to continue</h4>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={signInValidation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={style.formControl}>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
