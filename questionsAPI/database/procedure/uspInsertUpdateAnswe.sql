CREATE PROCEDURE uspInsertUpdateAnswer(
	@id VARCHAR(50),
    @user_email VARCHAR(50),
    @question_id VARCHAR(50),
    @answer VARCHAR(MAX),
	@upvote INT,
	@downvote INT,
	@date_answered DATETIME

    )
AS
BEGIN
    IF EXISTS(
    SELECT *
    FROM answerTable
    WHERE id =@id AND question_id=@question_id)
    BEGIN
        UPDATE answerTable
         SET answer=@answer
         WHERE id = @id AND question_id=@question_id
    END
ELSE BEGIN
        INSERT INTO answerTable
            (id, user_email, question_id, answer,upvote, downvote, date_answered )
        VALUES
            (@id, @user_email, @question_id, @answer, @upvote, @downvote, @date_answered)
    END

END