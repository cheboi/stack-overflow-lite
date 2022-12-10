import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [image, setImage] = useState("");
  // const [price, setPrice] = useState();
  // const [discountRate, setDiscountRate] = useState("");

  // const [addRequestStatus, setAddRequestStatus] = useState("idle");

  // const onTitleChanged = (e) => setTitle(e.target.value);
  // const onDescriptionChanged = (e) => setDescription(e.target.value);
  // const onPriceChanged = (e) => setPrice(e.target.value);
  // const onDiscountChanged = (e) => setDiscountRate(e.target.value);
  // const onImageChanged = (e) => setImage(e.target.value);

  // const canSave =
  //   [title, description, price, image, discountRate].every(Boolean) &&
  //   addRequestStatus === "idle";

  // const onSaveProductClicked = () => {
  //   if (canSave) {
  //     try {
  //       setAddRequestStatus("pending");
  //       dispatch(
  //         addNewProduct({
  //           title,
  //           price,
  //           image,
  //           discountRate,
  //           body: description,
  //         })
  //       ).unwrap();

  //       setTitle("");
  //       setDescription("");
  //       setImage("");
  //       setPrice("");
  //       setDiscountRate("");
  //     } catch (err) {
  //       console.error("Failed to save the product", err);
  //     } finally {
  //       setAddRequestStatus("idle");
  //     }
  //   }
  // };

  // const handleSubmit = () => {};
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={questionSchema}
      onSubmit={({ setSubmitting, data }) => {
        // alert("Form is validated! Submitting the form");
        // navigate("/");

        console.log(data);
        let formData = new FormData();
        formData.append("questiontitle", data.queststiontitle);
        formData.append("description", data.description);
        // formData.append('password', data.password)

        axios({
          method: "POST",
          url: "http://localhost:4000/questions",
          data: formData,
        })
          .then(function (res) {
            console.log(res);
            // alert('Successfully signed up!');
          })
          .catch(function (res) {
            console.log(res);
          });

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
