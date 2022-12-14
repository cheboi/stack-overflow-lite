CREATE PROCEDURE [dbo].[PetSave](
        @personToken uniqueidentifier, 
        @clientPersonToken uniqueidentifier,
        @petToken uniqueidentifier,
        @name VARCHAR (255),
        @breed VARCHAR (255) = null,
        @color VARCHAR (255) = null,
        @birthDate DATETIME = null,
        @spayed BIT = null,
        @businessPetTypeID BIGINT,
        @petWeightClassLookupID BIGINT = null,
        @petGenderLookupID BIGINT,
        @microchipCompanyName   VARCHAR (255) = NULL,
        @microchipNumber    VARCHAR (255) = NULL,
        @behaviouralIssues  VARCHAR (MAX) = NULL,
        @foodLocation   VARCHAR (MAX) = NULL,
        @additionalNotes    VARCHAR (MAX) = NULL,
        @vaccines udtPetVaccine READONLY,
        @medicines udtPetMedicine READONLY,
        @veterinanians udtPetVeterinanian READONLY,
        @questions udtPetQuestionAnswers READONLY)
AS

BEGIN

    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @clientId BIGINT = null;
        DECLARE @petID BIGINT = null;
        DECLARE @addressID BIGINT = null;
        DECLARE @phoneID BIGINT = null;
        DECLARE @veterinanianID BIGINT = null;
        DECLARE @personId bigint;
        DECLARE @OutputAddress Table (AddressID bigint, Street1 varchar(255));
        DECLARE @OutputPhone Table (PhoneID bigint, PhoneNumber varchar(255));
        DECLARE @OutputOtherPhone Table (PhoneID bigint, PhoneNumber varchar(255))

        SELECT @personId = PersonId from Person where PersonToken = @personToken

        SELECT @clientId = ClientID FROM Client c INNER JOIN Person p on p.PersonID = c.PersonID
        WHERE p.PersonToken = @clientPersonToken

        BEGIN TRANSACTION

            EXEC @petID = PetInformationSave @personToken = @personToken, @clientPersonToken = @clientPersonToken,
                @petToken = @petToken, @name = @name, @breed = @breed, @color = @color, @birthDate = @birthDate,
                @spayed = @spayed, @businessPetTypeID = @businessPetTypeID, @petWeightClassLookupID = @petWeightClassLookupID,
                @petGenderLookupID = @petGenderLookupID, @microchipCompanyName = @microchipCompanyName, 
                @microchipNumber = @microchipNumber

            EXEC PetMedicineSave @personToken = @personToken, @clientPersonToken = @clientPersonToken,
                @petToken = @petToken, @medicines = @medicines

            EXEC PetVaccineSave @personToken = @personToken, @clientPersonToken = @clientPersonToken,
                @petToken = @petToken, @vaccines = @vaccines

            EXEC PetVeterinanianSave @personToken = @personToken, @clientPersonToken = @clientPersonToken,
                @petToken = @petToken, @veterinanians = @veterinanians

            EXEC PetQuestionnaireSave @personToken = @personToken,
                @petToken = @petToken, @petQuestionAnswers = @questions

            EXEC PetAdditionalInfoSave @personToken = @personToken, @clientPersonToken = @clientPersonToken,
                @behaviouralIssues = @behaviouralIssues, @foodLocation = @foodLocation,
                @petToken = @petToken,
                @additionalNotes = @additionalNotes

        COMMIT TRANSACTION
        
        SELECT @PetID, PetToken from Pet WHERE PetID = @PetID
		FOR JSON PATH, INCLUDE_NULL_VALUES;

    END TRY
    BEGIN CATCH
        if (@@TRANCOUNT > 0)
		begin
			rollback transaction;
		end;
        throw;
    END CATCH
END