CREATE or AlTER PROCEDURE uspInsertUpdateVotes(
    @user_id VARCHAR(50),
    @answer_id VARCHAR(50),
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