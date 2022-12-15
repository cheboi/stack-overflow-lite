import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { askQuestion } from "../../features/questionSlice";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import classes from "./askquestion.module.css";
const INITIAL_VALUES = { questiontitle: "", description: "" };

const questionSchema = Yup.object().shape({
  questiontitle: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(2, "Too Short!").required("Required"),
});
const AskquestionForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // const onTitleChanged = (e) => setTitle(e.target.value);
  // const onDescriptionChanged = (e) => setDescription(e.target.value);

  // const canSave =
  //   [title, description].every(Boolean) && addRequestStatus === "idle";

  const onSaveQuestionClicked = async (formValues) => {
    const { questiontitle, description } = formValues;
      try {
        setAddRequestStatus("pending");
        await dispatch(
          askQuestion({
            questiontitle,
            description,
          })
        ).unwrap();

        navigate("/");
      } catch (err) {
        console.error("Failed to save the question", err);
      } finally {
        setAddRequestStatus("idle");
      }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={questionSchema}
      onSubmit={onSaveQuestionClicked}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={classes.questionForm}>
            <div className="form-group">
              <label htmlFor="queststiontitle">queststiontitle</label>
              <br />
              <Field
                type="text"
                name="questiontitle"
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
