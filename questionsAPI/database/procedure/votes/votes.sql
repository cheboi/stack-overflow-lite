CREATE OR ALTER PROCEDURE uspGetVotes
AS
BEGIN
  SELECT * FROM votesTable;
END;