import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import classes from "./askquestion.module.css";
const INITIAL_VALUES = { queststiontitle: "", description: "" };

const questionSchema = Yup.object().shape({
  questiontitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(2, "Too Short!").required("Required"),
});
const AskquestionForm = () => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={questionSchema}
      onSubmit={({ setSubmitting }) => {
        alert("Form is validated! Submitting the form");
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={classes.questionForm}>
            <div className="form-group">
              <label htmlFor="queststiontitle">queststiontitle</label>
              <br />
              <Field
                type="text"
                name="queststiontitle"
                className={classes.questionTitle}
              />
              {errors.descriptiontitle && touched.description ? (
                <div>{errors.descriptiontitle}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <br />
              <Field
                type="field"
                name="description"
                className={classes.descriptionField}
              />
              {errors.description && touched.descripttion ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            <div className={classes.formGroup}>
              <button type="submit" className={classes.answerButton}>
                Submit Answer
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AskquestionForm;
