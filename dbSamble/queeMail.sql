CREATE PROCEDURE [dbo].[EmailQueueGet]
(
    @TemplateIDs udtInteger READONLY,
    @EmailSent BIT = 0
)
AS
BEGIN

SET NOCOUNT ON;
    SELECT * FROM EmailQueue eq
    JOIN @TemplateIDs t ON t.[value] = eq.EmailTemplateID
    WHERE EmailSent = @EmailSent
END