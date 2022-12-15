CREATE or ALTER PROCEDURE getQuestionById(@id varchar(50))
AS
BEGIN
SELECT * FROM dbo.questionsTable WHERE id = @id

END