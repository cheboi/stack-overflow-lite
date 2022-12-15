CREATE OR ALTER PROCEDURE deleteQuestion(@id varchar(50))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.questionsTable WHERE id=@id)
		BEGIN
			UPDATE dbo.questionsTable SET isDeleted=1 WHERE id=@id
		END
		ELSE
		BEGIN
			RAISERROR ('No question at the moment',11,1)
		END
END