CREATE OR ALTER PROC uspGetQuestionsAnswers
AS
BEGIN
  SELECT 
    q.id, q.user_id, q.title,q.description,  q.date_asked,u.username, 
    (select count(a.question_id) from answerTable a WHERE a.question_id = q.id) totalAnswer
    FROM questionsTable q LEFT JOIN UsersTable u 
    ON q.user_id = u.id 
END;