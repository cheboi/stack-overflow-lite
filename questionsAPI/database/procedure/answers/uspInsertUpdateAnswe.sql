CREATE OR ALTER PROCEDURE uspInsertUpdateAnswer(
	@id VARCHAR(50),
    @user_id VARCHAR(50),
    @question_id VARCHAR(50),
    @answer VARCHAR(MAX),
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
            (id, user_id, question_id, answer, date_answered )
        VALUES
            (@id, @user_id, @question_id, @answer, @date_answered)
    END

END


CREATE or Alter PROCEDURE insertUpdateVote(
    @user_id VARCHAR(200),
    @answer_id VARCHAR(200),
    @Vote BIT
    )
AS
BEGIN
    IF EXISTS(
    SELECT*
    FROM downUpVote
    WHERE answer_id = @answer_id AND user_id = @user_id) 
    BEGIN
        UPDATE downUpVote
         SET Vote = @Vote
         WHERE answer_id = @answer_id AND user_id = @user_id;
    END
ELSE BEGIN
        INSERT INTO downUpVote
            (user_id, answer_id, Vote )
        VALUES
            (@user_id, @answer_id, @Vote)
    END

END