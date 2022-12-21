import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { BsCloudCheckFill } from "react-icons/bs";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setHeaders } from "../../features/api/api";
import Comment from "../Comment/index";
import {
  getAnswerStatus,
  selectAllAnswers,
  getErrorStatus,
  getAnswers,
  addAnswer,
  VoteAnswer,
  preferedAnswer,
} from "../../features/answerSlice";
import jwt from "jwt-decode";
import moment from "moment";

import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import classes from "../HomePage/home.module.css";
import "../../style.css";

const INITIAL_VALUES = { answer: "" };
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

  const answer = useSelector(selectAllAnswers);
  const status = useSelector(getAnswerStatus);
  const answerError = useSelector(getErrorStatus);
  const navigate = useNavigate();
  const token = setHeaders()["x-access-token"];
  const decode = jwt(token, { headers: true });

  const user_id = decode.id;

  console.log(answer);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(-1);

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

  console.log("All Answers" + JSON.stringify(answer));

  const handleUpVote = (vote) => {
    let V = { ...vote, upvote: 1, Vote: 0 };
    dispatch(VoteAnswer(V));
  };

  const handleDownVote = (vote) => {
    let V = { ...vote, upvote: 0, Vote: 1 };
    dispatch(VoteAnswer(V));
  };
  const getComentHandler = () => {
    setShow((prev) => !prev);
  };

  const handlePrefered = (data) => {
    dispatch(preferedAnswer(data));
  };
  const rejectPrefered = (data) => {
    dispatch(preferedAnswer(data));
  };

  let bodyContent;

  if (status === "loading") {
    bodyContent = <div className="loader"></div>;
  } else if (status === "successful") {
    const sortedAnswers = answer.slice().sort((a, b) => b.id - a.id);

    bodyContent = sortedAnswers.map((answer) => (
      <div key={answer.id}>
        <p>{answer.answer}</p>
      </div>
    ));
  } else {
    bodyContent = <div>{answerError}</div>;
  }

  const onSaveQuestionClicked = async (formValues) => {
    const { answer } = formValues;
    try {
      await dispatch(
        addAnswer({
          answer,
        })
      ).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Failed to save the answer", err);
    } finally {
    }
  };

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
            onSubmit={onSaveQuestionClicked()}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={classes.questionForm}>
                  <div className="form-group">
                    <label htmlFor="answer">Answer The The Question</label>
                    <br />
                    <Field
                      type="field"
                      name="answer"
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
                  <div>
                    <div className={classes.homeCard}>
                      <div className="answer_container">
                        {user_id === item.user_id ? (
                          <div className="accept_answer">
                            <BsCloudCheckFill
                              onClick={() => {
                                handlePrefered({
                                  ...item,
                                  prefered: 1,
                                });
                              }}
                              style={{
                                color: "green",
                                fontSize: "20px",
                              }}
                            />

                            <MdCancel
                              onClick={() => {
                                rejectPrefered({
                                  ...item,
                                  prefered: 0,
                                });
                              }}
                              style={{
                                color: "red",
                                fontSize: "15px",
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className={classes.votesSection}>
                        <button
                          onClick={() => {
                            handleUpVote(item);
                          }}
                        >
                          <GoTriangleUp />
                          <br />
                        </button>
                        <span style={{ paddingLeft: "2px" }}>
                          {item.count}
                          {item?.prefered === true ? (
                            <i
                              class="fa fa-check"
                              style={{
                                color: "green",
                                fontSize: "20px",
                                paddingLeft: "6px",
                              }}
                            ></i>
                          ) : null}
                        </span>
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
                    <div className="comment-btn">
                      <div
                        onClick={() => {
                          getComentHandler(index);
                        }}
                      >
                        {show === index ? (
                          <i class="fas fa-minus-circle"></i>
                        ) : (
                          <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        )}
                      </div>
                    </div>
                    <div className="comment_add">
                      {show === index ? (
                        <Comment answer_id={item?.answer_id} />
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answers;
