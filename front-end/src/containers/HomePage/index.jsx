import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getQuestions,
  selectAllQuestions,
  getQuestionStatus,
  getErrorStatus,
} from "../../features/questionSlice";
//front-end\src\features\answerSlice.js
import { getAnswers } from "../../features/answerSlice"

import classes from "./home.module.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const questionStatus = useSelector(getQuestionStatus);
  const questionError = useSelector(getErrorStatus);
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (questionStatus === "idle") {
  //   dispatch(getQuestions());
  //   }
  // }, [questions, dispatch]);


  useEffect(() => {
    dispatch(getQuestions());

    if (questionStatus === "idle") {
      dispatch(getQuestions());
    }
  },[]);

  const handleAnswers = (question_id) => {
    dispatch(getAnswers(question_id));
    navigate("/answers");
  };

  // const handlesearch = () => {
  //   if (search.search_value) {
  //     dispatch(searchQuestions(search));
  //     navigate("/searches");
  //   } else {
  //     alert(" nothing to search");
  //   }
  // };

  console.log("List Of Questions" + questions);
  let content2;

  if (questionStatus === "loading") {
    content2 = <p>Loading...</p>;
  } else if (questionStatus === "succeeded") {
    content2 = questions.map((p) => {
      return (
        <article onClick={() => navigate()}>
          <div className={classes.homeContent} key={p.id}>
            <div className="product-details">
              <div  onClick={() => handleAnswers(p?.question_id)} styles={{color: "yellow"}}>
                <h1>{p?.title}</h1>
                <p className="description">{p?.description}</p>
              </div>
            </div>
          </div>
        </article>
      );
    });
  } else if (questionStatus === "failed") {
    content2 = <p>Error : {questionError}</p>;
  }

  return (
    <section className={classes.homeContainer}>
      <div className={classes.search}>
        <input
          className={classes.searchBar}
          placeholder="Search for questions"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className={classes.homeContent}>{content2}</div>
    </section>
  );
};

export default Home;
