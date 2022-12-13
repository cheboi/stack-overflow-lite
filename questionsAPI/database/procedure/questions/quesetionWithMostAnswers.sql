CREATE OR ALTER PROC uspMostAnsweredQuestions(@range INT)
AS
BEGIN
  SELECT question.id from questionsTable question LEFT JOIN answerTable answer ON question.id = answer.question_id GROUP BY question.id HAVING count(answer.question_id) > 5 
END;
