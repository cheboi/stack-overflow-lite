CREATE OR ALTER PROCEDURE mostAnswerQuestion(
        @PageNumber int
)
AS
BEGIN
DECLARE @RowsOfPage AS INT
SET @RowsOfPage=5
SELECT Question.title, Question.id,Question.date_asked, COUNT(Answer.question_id) as count
FROM questionsTable Question
LEFT JOIN answerTable Answer ON Question.id=Answer.question_id
GROUP BY  Question.title,Question.id,Question.date_asked HAVING COUNT(Answer.question_id)>0
ORDER by count  DESC
 OFFSET (@PageNumber-1)*@RowsOfPage ROWS
 FETCH NEXT @RowsOfPage ROWS ONLY   
SELECT COUNT(Question.id) as count FROM questionsTable Question
END