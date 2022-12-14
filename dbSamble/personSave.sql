CREATE PROCEDURE [dbo].[PersonSave](
        @persontoken uniqueidentifier = null, 
        @emailAddress VARCHAR (255) = null,
        @passwordHash VARCHAR (MAX) = null,
        @firstName VARCHAR(255) = null,
        @lastName VARCHAR (255) = null,
        @timeZoneId INT = null,
        @SMSOptIn BIT = 0,
        @OptInPhoneNumber VARCHAR (255) = ''
)
AS

BEGIN

    SET NOCOUNT ON;

        DECLARE @personId bigint;

        IF (@persontoken is null)
        BEGIN
            INSERT INTO Person (PersonToken, FirstName, LastName, EmailAddress, UserName, [Password], TimeZoneLookupID, SMSOptIn, OptInPhoneNumber)
             SELECT NEWID(), @firstName, @lastName, @emailAddress, @emailAddress, @passwordHash, @timeZoneId, @SMSOptIn, @OptInPhoneNumber

            SELECT @personId = SCOPE_IDENTITY()
        END
        ELSE
        BEGIN
            SELECT @personId = PersonId from Person where PersonToken = @persontoken

            UPDATE Person 
            SET FirstName = ISNULL(@firstName, FirstName),
                LastName = ISNULL(@lastName,LastName),
                [Password] = ISNULL(@passwordHash,[Password]),
                TimeZoneLookupID = ISNULL(@timeZoneId,TimeZoneLookupID),
                SMSOptIn = ISNULL(@SMSOptIn,SMSOptIn),
                OptInPhoneNumber = ISNULL(@OptInPhoneNumber,OptInPhoneNumber)
                WHERE PersonToken = @persontoken
        END
        RETURN @personId;
