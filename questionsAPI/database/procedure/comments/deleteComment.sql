CREATE OR ALTER PROCEDURE deleteComment(@id varchar(50))
AS
BEGIN
	IF EXISTS(SELECT * FROM dbo.commentsTable WHERE id=@id)
		BEGIN
			UPDATE dbo.commentsTable SET isDeleted=1 WHERE id=@id
		END
		ELSE
		BEGIN
			RAISERROR ('No item at the moment',11,1)
		END
END