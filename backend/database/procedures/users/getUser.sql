CREATE PROCEDURE getUser (@email VARCHAR(50))
AS
BEGIN
SELECT * FROM UsersTable WHERE email = @email
END