import React, { useState, useEffect } from "react";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, selectAllQuestions } from "../../features/questionSlice";

import classes from "../HomePage/home.module.css";

const Answers = () => {
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);

  console.log("data is Working");

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  console.log(questions);
  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeContent}>
        <div className={classes.homeCard}>
          <div className={classes.votesSection}>
            <GoTriangleUp />
            <br />
            {}
            <GoTriangleDown />
          </div>
          <div className={classes.questionSections}>
            <p>Ansers will be displayed Here</p>
          </div>
        </div>
        <div className={classes.homeCard}>
          <div className={classes.votesSection}>
            <GoTriangleUp />
            <br />
            {}
            <GoTriangleDown />
          </div>
          <div className={classes.questionSections}>
            <p>Questions will be displayes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answers;
