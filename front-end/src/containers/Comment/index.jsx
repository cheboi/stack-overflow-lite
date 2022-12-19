import React, { useEffect } from "react";
import { getComments, selectAllComments , getCommentStatus } from "../../features/commentSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
export default function Comment({ answer_id }) {
  const Comments = useSelector(selectAllComments );
  const commentStatus = useSelector(getCommentStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(answer_id));
  }, [dispatch, answer_id]);
  if (commentStatus === 'loading') return <>Loading</>;
  return (
    <div className="comment_">
      <div className="addcomment">
        <p>model will go here</p>
      </div>
      {Comments.length === 0 ? (
        <p>Be the First one To Comment</p>
      ) : (
        Comments?.map((item) => (
          <div class="comment-main">
            <div class="comments-box">
              <div class="comment-text">
                <div class="comment-text-area">
                  {item?.comment_descprition}
                  <span>{moment(item?.date_commented).fromNow()}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}