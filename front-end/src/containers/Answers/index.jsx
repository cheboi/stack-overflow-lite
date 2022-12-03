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
            <p style={{ width: "60vw" }}>Ansers will be displayed Here</p>
          </div>
          <ul className={classes.anSwerDetail}>
            <li>User</li>
            <li>Date</li>
            <li>Prefered</li>
            <li>
              <a>comments</a>
            </li>
          </ul>
          <button className={classes.commentCard}>Comment</button>
        </div>
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
            <li>User</li>
            <li>Date</li>
            <li>Prefered</li>
            <li>
              <a>comments</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Answers;
