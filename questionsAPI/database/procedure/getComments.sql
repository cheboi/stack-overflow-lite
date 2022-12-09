CREATE PROCEDURE getComments(
    @answer_id VARCHAR(100)
)
  AS
  BEGIN
  SELECT * FROM Comment
  WHERE  answer_id=@answer_id
END