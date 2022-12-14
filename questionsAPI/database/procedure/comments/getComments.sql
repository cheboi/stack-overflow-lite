CREATE OR ALTER PROCEDURE getComments(
    @answer_id VARCHAR(50)
)
  AS
  BEGIN
  SELECT * FROM commentsTable
  WHERE  answer_id=@answer_id
END