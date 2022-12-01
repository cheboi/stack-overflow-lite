import React, { useState, useEffect } from "react";
import classes from "./home.module.css";
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions } from '../../features/questionSlice'

const Home = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const { questions, loading } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(getQuestions())
  }, [])

  if (loading) return <p>Loading...</p>


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
          {}
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
