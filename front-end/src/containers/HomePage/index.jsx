import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  getQuestions,
  searchQuestions,
  selectAllQuestions,
  getQuestionStatus,
  getErrorStatus,
} from "../../features/questionSlice";
//front-end\src\features\answerSlice.js
import { getAnswers } from "../../features/answerSlice";

import classes from "./home.module.css";

const Home = () => {
  const [query, setQuery] = useState({ search_value: "" });
  const questionStatus = useSelector(getQuestionStatus);
  const questionError = useSelector(getErrorStatus);
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const navigate = useNavigate();

  useEffect(() => {
    if (questionStatus === "idle") {
      dispatch(getQuestions());
    }
  }, [questions, dispatch]);

  useEffect(() => {
    dispatch(getQuestions());

    if (questionStatus === "idle") {
      dispatch(getQuestions());
    }
  }, []);

  const handleAnswers = (id) => {
    dispatch(getAnswers(id));
    navigate("/answers");
  };

  const handlesearch = () => {
    if (query.search_value) {
      dispatch(searchQuestions(query));
      navigate("/search");
    } else {
      alert("No question you can ask?");
    }
  };

  const handleInputChange = (e) => {
    setQuery((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  console.log("List Of Questions" + questions);
  let content2;

  if (questionStatus === "loading") {
    content2 = <p>Loading...</p>;
  } else if (questionStatus === "succeeded") {
    content2 = questions.map((p) => {
      return (
        <article>
          <div className={classes.homeContent} key={p.id}>
            <div className="product-details">
              <div
                onClick={() => handleAnswers(p?.id)}
                styles={{ color: "yellow" }}
              >
                <h1>{p?.title}</h1>
                <p className="description">{p?.description}</p>
                <div className="time"> <span>{moment(p?.date_asked).fromNow()}</span></div>
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
          type="text"
          className={classes.searchBar}
          placeholder="Search for questions"
          name="search_value"
          value={query.search_value}
          onChange={handleInputChange}
        />
        <button onClick={handlesearch}>
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div className={classes.homeContent}>{content2}</div>
    </section>
  );
};

export default Home;
