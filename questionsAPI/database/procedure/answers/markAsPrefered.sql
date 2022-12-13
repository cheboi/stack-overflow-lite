CREATE OR ALTER PROCEDURE markAsPrefered(@id varchar(50))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.answerTable WHERE id=@id)
		BEGIN
			UPDATE dbo.answerTable SET prefered=1 WHERE id=@id
		END
		ELSE
		BEGIN
			RAISERROR ('No question at the moment',11,1)
		END
END