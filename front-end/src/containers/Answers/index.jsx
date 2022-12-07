import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Mention, MentionsInput } from "react-mentions";
import mentionsInputStyle from "../../styles/mentionsInputStyles.js";
import mentionStyle from "../../styles/mentionStyles.js";
import styles from "./comment.module.css";

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
  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    comment: "",
  });
  const [comments, setComments] = useState([]);
  const [emojiValue, setEmojiValue] = useState([]);
  const notMatchingRegex = /($a)/;

  console.log("data is Working");

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json"
    )
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        setEmojiValue(jsonData.emojis);
      });
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

  const queryEmojis = (query, callback) => {
    if (query.length === 0) return;
    const filterValue = emojiValue
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return filterValue.map(({ emoji }) => ({ id: emoji }));
  };
  const users = [
    {
      id: "isaac",
      display: "Isaac Emanuel",
    },
    {
      id: "Cheboi",
      display: "moses@sumbey.com",
    },
    {
      id: "emma",
      display: "emmanuel@nobody.com",
    },
  ];

  const submit = () => {
    if (
      // formState.username === "" ||
      formState.comment === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    setComments((comments) => [
      ...comments,
      {
        username: formState.username,
        comment: formState.comment,
      },
    ]);
    setFormState({
      username: "",
      comment: "",
    });
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  console.log(questions);
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
        <div style={{ margin: "20px" }}>
          <div className={classes.homeCard}>
            <div className={classes.votesSection}>
              <GoTriangleUp />
              <br />
              7
              <br />
              <GoTriangleDown />
            </div>
            <div className={classes.questionSections}>
              <p style={{ width: "60vw" }}>Answers will be displayed Here</p>
            </div>
            <ul className={classes.anSwerDetail}>
              <li>@Cheboi</li>
              <li>11/12/2022</li>
              <li></li>
            </ul>
          </div>
          <div className={classes.CommentContainer}>
            <button onClick={() => setShow((prev) => !prev)}>Comments</button>
            {show && (
              <div className={styles.form}>
                <section className={styles.formCard}>
                  <MentionsInput
                    placeholder="Add Comment. Use '@' for mention"
                    value={formState.comment}
                    onChange={(e) =>
                      setFormState({ ...formState, comment: e.target.value })
                    }
                    style={mentionsInputStyle}
                  >
                    <Mention style={mentionStyle} data={users} />
                  </MentionsInput>
                  <button className={styles.mentionBtn} onClick={submit}>
                    Submit
                  </button>
                </section>
                {comments.length === 0 ? null : (
                  <section>
                    {comments.map((comment, i) => (
                      <div className={styles.commentCard} key={i}>
                        <p className={styles.username}>
                          {comment.username} on {date}
                        </p>
                        <h2>{comment.comment}</h2>
                      </div>
                    ))}
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
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
              <li>
                <Link style={{ textDecoration: "none" }}>@Barkute</Link>
              </li>
              <li>02/11/2022</li>
              <li>
                <Link></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answers;
