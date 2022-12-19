import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { FcAcceptDatabase } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnswerStatus,
  selectAllAnswers,
  getErrorStatus,
  getAnswers,
  VoteAnswer,
} from "../../features/answerSlice";
import jwt from "jwt-decode";
import moment from "moment";

import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Mention, MentionsInput } from "react-mentions";
import mentionsInputStyle from "../../styles/mentionsInputStyles.js";
import mentionStyle from "../../styles/mentionStyles.js";
import styles from "./comment.module.css";
import classes from "../HomePage/home.module.css";
import "../../style.css";

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

const Answers = () => {
  const dispatch = useDispatch();

  // Get the answers from the store
  const answer = useSelector(selectAllAnswers);
  const status = useSelector(getAnswerStatus);
  const answerError = useSelector(getErrorStatus);
  const navigate = useNavigate();

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    comment: "",
  });
  const [comments, setComments] = useState([]);
  const [emojiValue, setEmojiValue] = useState([]);
  const notMatchingRegex = /($a)/;

  const [isActive, setIsActive] = useState(false);

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

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isMounted = true;

    // If status is 'idle', then fetch the posts data from the API
    if (status === "idle") {
      dispatch(getAnswers());
    }

    // Cleanup function
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dispatch]);

  console.log("All Answers" + answer);

  const handleUpVote = (vote) => {
    let V = { ...vote, upvote: 1, Vote: 0 };
    dispatch(VoteAnswer(V));
  };

  const handleDownVote = (vote) => {
    let V = { ...vote, upvote: 0, Vote: 1 };
    dispatch(VoteAnswer(V));
  };
  // const getComentHandler = () => {
  //   setShow((prev) => !prev);
  // };

  let bodyContent;

  if (status === "loading") {
    bodyContent = <div className="loader"></div>;
  } else if (status === "successful") {
    // Sort the posts by id in descending order
    const sortedAnswers = answer.slice().sort((a, b) => b.id - a.id);

    // Map through the sorted answers and display them
    bodyContent = sortedAnswers.map((answer) => (
      <div key={answer.id}>
        <p>{answer.answer}</p>
      </div>
    ));
  } else {
    // Display the error message
    bodyContent = <div>{answerError}</div>;
  }
  //<div>{bodyContent}</div>

  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeContent}>
        <button onClick={openModal} style={{ width: "100px", float: "left" }}>
          Answer
        </button>
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
        <div className="accordion">
        {/* {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))} */}
          <div className="accordion-item">
            <div
              className="accordion-title"
              onClick={() => setIsActive(!isActive)}
            >
              {answer[0]?.id === null ? (
                <p>
                  No one has Answered the question! do you know the answer or
                  some who knows the answer?
                </p>
              ) : (
                answer?.map((item, index) => (
                  <div className={classes.homeCard}>
                    <div className={classes.votesSection}>
                      <GoTriangleUp
                        onClick={() => {
                          handleUpVote(item);
                        }}
                      />
                      <br />
                      {item.count}
                      <br />
                      <GoTriangleDown
                        onClick={() => {
                          handleDownVote(item);
                        }}
                      />
                      {item?.prefered === true ? <FcAcceptDatabase /> : null}
                    </div>
                    <div className={classes.questionSections}>
                      <p style={{ width: "60vw" }}>{item.answer}</p>
                    </div>
                    <ul className={classes.anSwerDetail}>
                      <li>
                        <span>{moment(item.date_answered).fromNow()}</span>
                      </li>
                      <li></li>
                    </ul>
                  </div>
                ))
              )}
              <div>{isActive ? "-" : "+"}</div>
              {isActive && <div className="accordion-content">Comments</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answers;
