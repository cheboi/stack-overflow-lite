CREATE  or Alter PROCEDURE uspGetUser(
    @id VARCHAR(50)
)
  AS
  BEGIN
  SELECT U.id, U.username, U.email FROM UsersTable U WHERE U.id=@id 
  SELECT q.title, q.id, q.date_asked FROM questionsTable q WHERE q.user_id=@id and isDeleted='0'
  SELECT a.answer, a.id, a.date_answered FROM answerTable a WHERE a.user_id=@id and isDeleted='0'
  SELECT c.id, c.comment, c.date_commented FROM commentsTable c WHERE c.user_id=@id and isDeleted='0'
END