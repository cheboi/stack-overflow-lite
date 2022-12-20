import React, { useEffect } from "react";
import { getComments } from "../../features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import "./comment.css";
import moment from "moment";
import Editable from "./editable";


export default function Comment({ answer_id, question_id }) {
  const Comments = useSelector((state) => state.comment.Comments);
  const loading = useSelector((state) => state.comment.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(answer_id));
  }, [dispatch, answer_id]);

  if (!loading) return <>Loading</>;

  console.log(Comments);
  return (
    <div className="comment_">
      <div className="addcomment">
        <Editable answer_id={answer_id} question_id={question_id} />
      </div>
      {Comments.length === 0 ? (
        <p> No comment yet be the firstone to comment</p>
      ) : (
        Comments?.map((item) => (
          <div class="comment-main-box">
            <div class="comments-box">
              <div class="comment-text-box">
                <div class="comment-text">
                  {item?.comment_descprition}
                  <span>{moment(item?.comment_created).fromNow()}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
