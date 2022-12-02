0 CREATE PROCEDURE askQuestion(@id varchar(50),  @title varchar(50), @description varchar(Max))
AS
BEGIN
INSERT INTO dbo.QuestionsTable(id,  title,description)
VALUES(@id ,  @title, @description)
END