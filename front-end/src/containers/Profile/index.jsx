import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./profile.css";
export default function Profile() {
  const Profile = useSelector((state) => state.user.Profile);
  const loading = useSelector((state) => state.user.isLoading);

  if (!loading) return <>Loading</>;
  return (
    <div className="container-profile">
      <div className="performances">
        <h1>My Questions </h1>
        <div className="comment-profile">
          <div>
            <p>Questions {Profile[1]?.userQuestions?.length}</p>
          </div>
        </div>
        <div className="profile-content">
          <Link to="/profile">
            <button className="focus-btn">My profile </button>
          </Link>
          <Link to="/userquestions">
            <button className="focus-btn">Questions</button>
          </Link>
        </div>
      </div>
    </div>
  );
}