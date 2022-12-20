import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../features/answerSlice";
import { searchQuestions } from '../../features/questionSlice';
import { useNavigate } from "react-router-dom";
import moment from "moment";


export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState({ searchValue: "" });
  const Search = useSelector((state) => state.questions.search);

  const handleInputChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {}, [Search]);

  const handleSearch = () => {
    if (search.searchValue.length>2) {
      dispatch(searchQuestions(search));
    } else {
      alert(" nothing to search");
    }
  };
  
  const handleAnswers = (question_id) => {
    dispatch(getAnswers(question_id));
    navigate("/answers");
  };
  return (
    <div className="conatiner_home">
      <div className="search_container">
        <input
          id="search"
          type="text"
          name="search_value"
          value={search.searchValue}
          onChange={handleInputChange}
          placeholder="search"
        />
        <button onClick={handleSearch}>
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div>
        <div className="question">
          {Search.length === 0 ? (
        <p> There is no results</p>
      ) :Search?.map((item) => (
            <div
              className="question-1"
              onClick={() => handleAnswers(item?.id)}
            >
              <div>
                <button>
                <h1>{item?.title}</h1>
                  <p>
                    {item?.description}
                    <b>
                      <span>{moment(item.date_asked).fromNow()}</span>
                    </b>
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}