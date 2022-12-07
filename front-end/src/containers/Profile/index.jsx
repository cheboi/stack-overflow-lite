import React, { useState } from "react";
import Modal from "react-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import style from "./index.module.css";

//validation will be here
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
      (val) => val && val.toString().length >= 3 && val.toString().length <= 20
    )
    .required("This field is required!"),
  email: Yup.string()
    .email("This is not a valid email.")
    .required("This field is required!"),
  password: Yup.string()
    .test(
      "len",
      "The password must be between 6 and 40 characters.",
      (val) => val && val.toString().length >= 6 && val.toString().length <= 40
    )
    .required("This field is required!"),
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

export default function Profile() {
  const [successful, setSuccessful] = useState(false);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

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

  const handleProfileEdit = (formValue) => {
    // const { firstname, lastname, username, email, password } = formValue;
    // setSuccessful(false);
    // dispatch(register({ firstname, lastname, username, email, password }))
    //   .unwrap()
    //   .then(() => {
    //     setSuccessful(true);
    //   })
    //   .catch(() => {
    //     setSuccessful(false);
    //   });
  };

  return (
    <div className={style.Container}>
      <div className={style.ProfileSection}>
        <div className={style.ProfileDetail}>
          <div>
            <button
              onClick={openModal}
              style={{ width: "100px", float: "left" }}
            >
              Edit
            </button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                Update Your Profile
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleProfileEdit}
              >
                <Form>
                  {!successful && (
                    <div>
                      <div className={style.formGroup}>
                        <label htmlFor="firstname">First Name</label>
                        <br />
                        <Field
                          name="firstname"
                          type="text"
                          className={style.formControl}
                        />
                        <ErrorMessage
                          name="firstname"
                          component="div"
                          className={style.alertDanger}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <br />
                        <Field
                          name="lastname"
                          type="text"
                          className={style.formControl}
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className={style.alertDanger}
                        />
                      </div>
                      <div className={style.formGroup}>
                        <label htmlFor="username">Username</label>
                        <br />
                        <Field
                          name="username"
                          type="text"
                          className={style.formControl}
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className={style.alertDanger}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <br />
                        <Field
                          name="email"
                          type="email"
                          className={style.formControl}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className={style.alertDanger}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <br />
                        <Field
                          name="password"
                          type="password"
                          className={style.formControl}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className={style.alertDanger}
                        />
                      </div>

                      <div className="form-group">
                        <button type="submit" className={style.btnPrimary}>
                          Update
                        </button>
                        <button
                          onClick={closeModal}
                          style={{ background: "red" }}
                        >
                          close
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </Modal>
          </div>
          <div className={style.UserName}>
            <h2>
              <span>Moses</span> <span>Kiptoo</span>
            </h2>
          </div>
          <div className={style.Activities}>
            <div className={style.userAnswers}></div>
            <div className={style.userQuestions}>
              <p>
                <span className={style.SpanActivity}>Questions Asked </span>
                <span className={style.Numbers}>6</span>
              </p>
            </div>
            <div className={style.userQuestions}>
              <p>
                <span className={style.SpanActivity}>Answers </span>
                <span className={style.Numbers}>7</span>
              </p>
            </div>
            <div className={style.userQuestions}>
              <p>
                <span className={style.SpanActivity}>Comments </span>
                <span className={style.Numbers}>8</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
