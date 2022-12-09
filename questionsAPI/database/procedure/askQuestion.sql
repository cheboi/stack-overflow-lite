CREATE OR ALTER PROCEDURE askQuestion(@id varchar(50),  @title varchar(50), @description varchar(max), @user_email varchar(50), @date_asked datetime)
AS
BEGIN
INSERT INTO dbo.QuestionsTable(id,  title,description, user_email, date_asked )
VALUES(@id ,  @title, @description,@user_email, @date_asked )
END