CREATE  or Alter PROCEDURE getProfile(
    @user_id VARCHAR(100)
)
  AS
  BEGIN
  SELECT Users.user_name, Users.email, Users.Name,Question.description, Answer.answer_descprition, Comment.comment_descprition
    FROM Users
    LEFT JOIN Question on Users.user_id=Question.user_id
    LEFT JOIN Answer on Users.user_id=Answer.user_id
    LEFT JOIN Comment on Users.user_id=Comment.user_id
    WHERE  Users.user_id=@user_id
END