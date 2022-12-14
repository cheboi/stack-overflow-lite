CREATE
OR ALTER PROCEDURE updatePreferredAnswer(@id varchar(50)) 
AS BEGIN
SET
  NOCOUNT ON;
UPDATE
  answersTable
Set
  preferred = 1
where
  id = @id
END
