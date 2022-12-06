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

import classes from "./home.module.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const questionStatus = useSelector(getQuestionStatus);
  const questionError = useSelector(getErrorStatus);
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const navigate = useNavigate();

  useEffect(() => {
    // if (questionStatus === "idle") {
    dispatch(getQuestions());
    // }
  }, [questions, dispatch]);

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
              <Link to="/react">
                <h1>{p?.title}</h1>
                <p className="description">{p?.description}</p>
              </Link>
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
