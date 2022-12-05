import React from "react";
import { Outlet, Link } from "react-router-dom";

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
            <div>
              <nav className="nav">
                <ul className="nav-ul">
                  <li className="nav-list">
                    <button className="nav-button">
                      <Link to="/profile">Profile</Link>
                    </button>
                    <button className="nav-button">
                      <Link to="/signup">SignIn</Link>
                    </button>
                  </li>
                  <li className="nav-list">
                    <button className="nav-button">
                      <Link to="/signin">SignIn</Link>
                    </button>
                  </li>
                  <li className="nav-list">
                    <button className="nav-button">
                      <Link to="/askquestion">Ask</Link>
                    </button>
                  </li>
                  <li className="nav-list">
                    <button className="nav-button">
                      <Link to="/">Home</Link>
                    </button>
                  </li>
                </ul>
              </nav>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
