CREATE or ALTER PROCEDURE getComment(@id varchar(50))
AS
BEGIN
SELECT * FROM dbo.commentsTable WHERE id = @id

END