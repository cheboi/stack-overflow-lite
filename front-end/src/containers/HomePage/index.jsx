import React, { useState, useEffect } from "react";
import classes from "./home.module.css";

// import UserService from "../../services/user.service";

const Home = () => {
  // const [content, setContent] = useState("");
  const [query, setQuery] = useState("");

  // useEffect(() => {
  //   // UserService.getPublicContent().then(
  //   //   (response) => {
  //   //     setContent(response.data);
  //   //   },
  //   //   (error) => {
  //   //     const _content =
  //   //       (error.response && error.response.data) ||
  //   //       error.message ||
  //   //       error.toString();

  //   //     setContent(_content);
  //   //   }
  //   // );
  // }, []);

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
        <div className={classes.homeCard}>
          <h3>title</h3>
          <p>
            sdfhjbcvnxhdfg hdfjghdfhjvv hdfjvhj djhdfjg jdhgjfdgj jgdjfhjfgh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
