CREATE OR ALTER PROC uspCountQuestions
AS
BEGIN
  SELECT COUNT(id) as total FROM questionsTable
END;