CREATE OR ALTER PROC uspSearchQuestion(@value VARCHAR(MAX))
AS
BEGIN
  SELECT * FROM questionsTable WHERE description LIKE '%'+@value+'%';
END;