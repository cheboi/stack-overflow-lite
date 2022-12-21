import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuestion } from "../../features/userSlice";

export default function UserQuestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const loading = useSelector((state) => state.user.isLoading);

  const handleAnswers = (question_id) => {
    dispatch(getAnswers(question_id));
    navigate("/answers");
  };

  const deletequestion = (data) => {
    dispatch(deleteQuestion(data));
  };
  
  if (!loading) return <>Loading</>;
  return (
    <div className="container-profile">
      <div className="user-profile-6">
        User info
      </div>
      <div className="answers">
        {user[1]?.userQuestions?.length === 0 ? (
          <p> You have no Questions posted recently </p>
        ) : (
          <div className="answe-0">
            {user[1]?.userQuestions?.map((item) => (
              <div className="user-answer">
                <div
                  className="usercontentquiz"
                  onClick={() => handleAnswers(item?.question_id)}
                >
                  {item?.title}
                  <b>
                    <span>{moment(item?.created).fromNow()}</span>
                  </b>
                </div>
                <div className="editbtn">
                  <div className="btn_user">
                    <i class="fas fa-edit"></i>
                  </div>
                  <div
                    className="btn_user"
                    onClick={() => deletequestion(item)}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}