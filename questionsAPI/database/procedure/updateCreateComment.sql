CREATE PROCEDURE insertUpdateComment(
	@id VARCHAR(100),
	@comment VARCHAR(MAX),
    @user_email VARCHAR(50),
    @answer_id VARCHAR(50),
	@date_commented DATETIME
    )
AS
BEGIN
    IF EXISTS(
    SELECT*
    FROM commentsTable
    WHERE answer_id = @answer_id AND id=@id) 
    BEGIN
        UPDATE commentsTable
         SET comment=@comment
         WHERE answer_id = @answer_id
    END
ELSE BEGIN
        INSERT INTO commentsTable
            (id,comment,user_email,answer_id,date_commented )
        VALUES
            (@id,@comment,@user_email,@answer_id,@date_commented)
    END

END