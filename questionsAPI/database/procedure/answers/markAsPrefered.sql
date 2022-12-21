CREATE or ALTER PROCEDURE markAsPrefered(
    @id VARCHAR(50),
    @prefered BIT 
)
AS
BEGIN
UPDATE answerTable SET prefered=@prefered WHERE id=@id
END
