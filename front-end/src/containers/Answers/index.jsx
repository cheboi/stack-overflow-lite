import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { getQuestions, selectAllQuestions } from "../../features/questionSlice";

import classes from "../HomePage/home.module.css";

const INITIAL_VALUES = {};
const answerSchema = Yup.object().shape({
  description: Yup.string().min(2, "Too Short!").required("Required"),
});
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Modal.setAppElement("#yourAppElement");

const Answers = () => {
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const navigate = useNavigate();

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  console.log("data is Working");

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#3d79fc";
  }

  console.log(questions);
  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeContent}>
        <button onClick={openModal}>Answer</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Provide your Answer
          </h2>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={answerSchema}
            onSubmit={({ setSubmitting }) => {
              alert("Form is validated! Submitting the form");
              navigate("/answers");
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={classes.questionForm}>
                  <div className="form-group">
                    <label htmlFor="description">Answer The The Question</label>
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
                    <button onClick={closeModal} style={{ background: "red" }}>
                      close
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
        <div className={classes.homeCard}>
          <div className={classes.votesSection}>
            <GoTriangleUp />
            <br />
            {}
            <GoTriangleDown />
          </div>
          <div className={classes.questionSections}>
            <p style={{ width: "60vw" }}>Answers will be displayed Here</p>
          </div>
          <ul className={classes.anSwerDetail}>
            <li>User</li>
            <li>Date</li>
            <li>Prefered</li>
            <li>
              <a>comments</a>
            </li>
          </ul>
          <button className={classes.commentCard}>Comment</button>
        </div>
        <div className={classes.homeCard}>
          <div className={classes.votesSection}>
            <GoTriangleUp />
            <br />
            4
            <br />
            <GoTriangleDown />
          </div>
          <div className={classes.questionSections}>
            <p style={{ width: "60vw" }}>Questions will be displayed Here</p>
          </div>
          <ul className={classes.anSwerDetail}>
            <li>User</li>
            <li>Date</li>
            <li>Prefered</li>
            <li>
              <a>comments</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Answers;
