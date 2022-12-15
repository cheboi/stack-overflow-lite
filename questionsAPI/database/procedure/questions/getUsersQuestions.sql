CREATE OR ALTER PROC uspFindUserQuestions(@user_id VARCHAR(50))
AS
BEGIN
 SELECT * FROM questionsTable WHERE user_id = @user_id;
END;