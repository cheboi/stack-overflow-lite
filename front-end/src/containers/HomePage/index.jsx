import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, selectAllQuestions } from "../../features/questionSlice";

import classes from "./home.module.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  console.log(questions);
  return (
    <div className={classes.homeContainer}>
      <div className={classes.search}>
        <input
          className={classes.searchBar}
          placeholder="Search for questions"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className={classes.homeContent}>
        {questions.map((question) => (
          <div className={classes.homeContent} key={question.id}>
            <h3>{question.title}</h3>
            <Link to={question.id}>{question.description}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
