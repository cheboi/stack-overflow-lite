CREATE OR ALTER PROCEDURE uspUpdateCreateQuestions(
@id varchar(50),  @title varchar(50), @description varchar(max), @user_id varchar(50), @answer_id varchar(50), @isDeleted bit, @date_asked datetime,
@StatementType VARCHAR(200)=''
)
AS
BEGIN
IF @StatementType = 'askQuestion'

        BEGIN
        INSERT INTO dbo.questionsTable(id,  title,description,user_id,date_asked)
		VALUES(@id,  @title, @description,@user_id, @date_asked)
        END

Else IF @StatementType = 'editQuestion'
    BEGIN
  UPDATE dbo.questionsTable SET  id=@id, title=@title, description=@description, user_id=@user_id, date_asked=@date_asked
    WHERE id=@id
    END
END