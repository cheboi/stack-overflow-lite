import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BsFilter } from "react-icons/bs";

import {
  getQuestions,
  searchQuestions,
  selectAllQuestions,
  getQuestionStatus,
  getErrorStatus,
  selectTotal,
  getRecentAskedQuestions,
  getMostAnsweredQuestions,
} from "../../features/questionSlice";
import { getAnswers } from "../../features/answerSlice";

import classes from "./home.module.css";

const Home = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [searchValue, setSearchValue] = useState("");
  const questionStatus = useSelector(getQuestionStatus);
  const questionError = useSelector(getErrorStatus);
  const dispatch = useDispatch();
  const questions = useSelector(selectAllQuestions);
  const total = useSelector(selectTotal);
  const navigate = useNavigate();
  const [sortButton, setSortButton] = useState("all");
  const [filters, setFilters] = useState(false);

  const totalPages = Math.ceil(total / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      dispatch(getQuestions({ pageNumber: page + 1, pageSize: limit }));
      dispatch(
        getRecentAskedQuestions({ pageNumber: page + 1, pageSize: limit })
      );
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      dispatch(getQuestions({ pageNumber: page - 1, pageSize: limit }));
      dispatch(
        getRecentAskedQuestions({ pageNumber: page - 1, pageSize: limit })
      );
    }
  };

  useEffect(() => {
    if (questionStatus === "idle") {
      dispatch(getQuestions());
    }
  }, [questions, dispatch]);

  // filters

  const handleFilters = (text) => {
    setSortButton(text);
  };

  useEffect(() => {
    if (sortButton === "all") {
      dispatch(getQuestions());
    } else if (sortButton === "recent") {
      dispatch(getRecentAskedQuestions());
    } else if (sortButton === "answers") {
      dispatch(getMostAnsweredQuestions());
    } else {
      dispatch(searchQuestions(searchValue));
    }
  }, [sortButton, searchValue]);


  const handleAnswers = (id) => {
    dispatch(getAnswers(id));
    navigate("/answers");
  };

  console.log("List Of Questions" + questions);

  if (questionStatus === "loading") {
    <p>Loading...</p>;
  }

  return (
    <section className={classes.homeContainer}>
      <div>
        <div className={classes.search}>
          <input
            type="search"
            className={classes.searchBar}
            placeholder="Search for questions"
            name="searchValue"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={() => dispatch(searchQuestions(searchValue))}>
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div className="homepage--filter" onClick={() => setFilters(!filters)}>
          Filter
          <BsFilter />
        </div>
      </div>

      {filters && (
        <div className="homepage--filter__buttons">
          <button
            text={"All"}
            className={"home-filter"}
            onClick={() => handleFilters("all")}
          >
            ALL
          </button>
          <button
            text={"Most Recent"}
            className={"home-filter"}
            onClick={() => handleFilters("answers")}
          >
            Recent
          </button>
          <button
            text={"Most Replies"}
            className={"home-filter"}
            onClick={() => handleFilters("replies")}
          >
            Most Answered Question
          </button>
        </div>
      )}
      <div className={classes.homeContent}>
        {questions?.length > 0 ? (
          <>
          {
            questions.map((p) => {
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
                        <div className="time">
                          {" "}
                          <span>{moment(p?.date_asked).fromNow()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          }</>
        ) : (<h2>no question at the moment</h2>)}
      </div>
      {sortButton !== "replies" && (
        <div className="home-pagisnation">
          <button
            className="vote-button"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>{page}</span>
          Out of
          <span>{totalPages}</span>
          <button
            className="vote-button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Home;
