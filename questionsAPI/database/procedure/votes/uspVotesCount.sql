CREATE OR ALTER PROCEDURE uspVotesCount(
  @id VARCHAR(255),
  @user_email VARCHAR(255),
  @answer_id VARCHAR(255),
  @totalVotes INT = 0
)
AS
BEGIN

  DECLARE @exist BIT

  SELECT @exist = count(id) from votesCountTable WHERE user_email = @user_email AND answer_id = @answer_id and totalVotes=@totalVotes
  
  if @exist > 0
    BEGIN
      DELETE FROM votesCountTable WHERE user_email = @user_email AND answer_id = @answer_id
    END
  ELSE
    BEGIN
      IF EXISTS (SELECT * FROM votesCountTable WHERE user_email = @user_email AND answer_id = @answer_id)
        UPDATE votesCountTable SET
          totalVotes = @totalVotes
        WHERE user_email = @user_email AND answer_id = @answer_id
      ELSE
        INSERT INTO votesCountTable(id, user_email, answer_id, totalVotes)
        VALUES (@id, @user_email, @answer_id, @totalVotes)
      END;
END