import React from "react";

import style from "./index.module.css";

export default function Profile() {
  return (
    <div className={style.Container}>
      <div className={style.ProfileSection}>
        <div className={style.ProfileDetail}>
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
                <span className={style.Numbers}>6</span>
              </p>
            </div>
            <div className={style.userComments}>
              <p>
                <span className={style.SpanActivity}>Comments </span>
                <span className={style.Numbers}>6</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
