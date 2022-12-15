CREATE OR ALTER PROCEDURE addUser (@id VARCHAR(50), @email VARCHAR(200), @username VARCHAR(200),@password VARCHAR(200))
AS
BEGIN
INSERT INTO UsersTable (id, email, username, password) VALUES(@id,@email, @username,@password)

END