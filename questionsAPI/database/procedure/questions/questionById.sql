CREATE or ALTER PROCEDURE getQuestionById(@id varchar(100))
AS
BEGIN
SELECT * FROM dbo.questionsTable WHERE id = @id

END