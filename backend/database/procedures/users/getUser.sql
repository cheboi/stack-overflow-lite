CREATE  or Alter PROCEDURE uspGetUser(
    @id VARCHAR(50)
)
  AS
  BEGIN
  SELECT U.id, U.username, U.email FROM UsersTable U WHERE U.id=@id 
  SELECT q.title, q.id, q.date_asked FROM questionsTable q WHERE q.user_id=@id and isDeleted='0'
END