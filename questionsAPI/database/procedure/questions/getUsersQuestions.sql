CREATE OR ALTER PROC uspFindUserQuestions(@user_email VARCHAR(50))
AS
BEGIN
 SELECT * FROM questionsTable WHERE user_email = @user_email;
END;