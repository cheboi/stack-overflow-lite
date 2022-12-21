CREATE OR ALTER PROC uspMostAnsweredQuestion
AS
BEGIN
 select q.id, count(a.question_id) as total from questionsTable q LEFT JOIN answerTable a ON q.id = a.question_id GROUP BY q.id HAVING count(a.question_id) >= 1 ORDER BY count(a.question_id) DESC;
END;