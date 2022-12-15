CREATE PROCEDURE [dbo].[ReportBusinessSiteAdmin]
(
	@StartDate              DATE = NULL,
	@EndDate                DATE = NULL,
    @BusinessName           VARCHAR(255) = NULL,
	@BusinessStatuses       udtInteger READONLY,
	@SubscriptionPackage    BIGINT = NULL,
	@PageNumber             INT = 0,
	@NumberOfRecordsPerPage INT = 10
)
AS
BEGIN

SET NOCOUNT ON;

    IF @BusinessName = '' SET @BusinessName = NULL
    IF @StartDate = '' SET @StartDate = NULL
    IF @EndDate = '' SET @EndDate = NULL
    IF @SubscriptionPackage = '' SET @SubscriptionPackage = NULL

    DECLARE @BusinessList AS TABLE (BusinessID BIGINT)
    DECLARE @BusinessNumberOfUsers AS TABLE (BusinessID BIGINT, SitterCount BIGINT, AdminCount BIGINT)
    DECLARE @BusinessAdminActiveStatus BIGINT = dbo.fn_LookupID('BUSINESS-ADMIN-STATUS','Active')
    DECLARE @BusinessSitterActiveStatus BIGINT = dbo.fn_LookupID('BUSINESS-SITTER-STATUS','Active')
    DECLARE @PaidSubscriptionStatus BIGINT = dbo.fn_LookupID('SUBSCRIPTION_STATUS','Paid')
    DECLARE @MailingAddressType BIGINT = dbo.fn_LookupID('ADDRESS-TYPE','Mailing')

    IF (SELECT count(*) FROM @BusinessStatuses WHERE [value] IN (0, 1)) > 0
    BEGIN
        INSERT INTO @BusinessList
        SELECT b.BusinessID 
        FROM Business b
        LEFT JOIN BusinessSubscription bs ON bs.BusinessID = b.BusinessID
        WHERE ((bs.ChargifyCanceledDTM < getUTCDate() OR bs.ChargifyCanceledDTM IS NULL)
			AND (b.TrialEndDate < getUTCDate() OR b.TrialEndDate IS NULL)) AND (bs.SubscriptionStatusLookupID != @PaidSubscriptionStatus)
    END

    INSERT INTO @BusinessNumberOfUsers
    select b.BusinessID, (
            -- SELECT COUNT(distinct pbr.PersonID) AS SitterCount 
            -- FROM BusinessSitter bss
            -- JOIN Sitter s ON s.SitterID = bss.SitterID
            -- JOIN PersonBusinessRole pbr ON pbr.PersonID = s.PersonID AND pbr.IsDeleted = 0 and RoleLookupID IN (2,3,4)
            -- WHERE bss.BusinessID = b.BusinessID AND bss.BusinessSitterStatusLookupID IN (853)

            select COUNT(distinct p.PersonID) AS SitterCount
            from Person p
            JOIN Sitter s on s.PersonID = p.PersonID
            JOIN BusinessSitter bs on bs.SitterID = s.SitterID and bs.BusinessID = b.BusinessID AND bs.BusinessSitterStatusLookupID IN (853)
            where (SELECT COUNT(PersonID) FROM PersonBusinessRole WHERE PersonID = p.PersonID) > 0
        ) as SitterCount,
        (
            SELECT COUNT(*) AS AdminCount FROM (
                SELECT bs.BusinessSitterID, ba.BusinessID
                FROM BusinessAdmin ba
                JOIN Person p on p.PersonID = ba.PersonID
                LEFT JOIN Sitter s on s.PersonID = p.PersonID
                LEFT JOIN BusinessSitter bs ON bs.SitterID = s.SitterID AND bs.BusinessSitterStatusLookupID = @BusinessSitterActiveStatus
                WHERE ba.BusinessID = b.BusinessID
                AND ba.BusinessAdminStatusLookupID = @BusinessAdminActiveStatus
            ) AS BusinessSitterID
            WHERE BusinessSitterID IS NULL
        ) AS AdminCount
    from Business b
    WHERE 1 = CASE 
        WHEN (SELECT count(*) FROM @BusinessList) = 0 THEN 1 
        WHEN (SELECT count(*) FROM @BusinessList) > 0 AND (SELECT count(*) FROM @BusinessStatuses WHERE [value] = 0) = 1 AND b.BusinessID IN (SELECT BusinessID FROM @BusinessList) THEN 1
        WHEN (SELECT count(*) FROM @BusinessList) > 0 AND (SELECT count(*) FROM @BusinessStatuses WHERE [value] = 1) = 1 AND b.BusinessID NOT IN (SELECT BusinessID FROM @BusinessList) THEN 1
        ELSE 0 
    END

    SELECT
        b.BusinessID,
        b.Name AS [Name],
        CONVERT(VARCHAR(10), b.InsertedDTM, 101) as CreatedDate,
        CASE WHEN dbo.fn_GetBusinessStatus(b.BusinessID) = 1 THEN 'Active' ELSE 'Inactive' END AS [Status],
        (
            bn.SitterCount + bn.AdminCount
        ) AS NumberOfSitters,
        CASE WHEN bso.BusinessSubscriptionOptionID = 8 THEN 'Free Trial' ELSE bso.Name END AS SubscriptionPackage,
        REPLACE(REPLACE(CONCAT_WS(',',(a.Street1),a.Street2,a.City,a.[State],a.Zip), ',,', ','), ',,', '') AS [Address]
    FROM Business b
    JOIN @BusinessNumberOfUsers bn ON bn.BusinessID = b.BusinessID
    LEFT JOIN BusinessSubscription bs ON bs.BusinessID = b.BusinessID
    LEFT JOIN BusinessSubscriptionOption bso ON bso.BusinessSubscriptionOptionID = bs.BusinessSubscriptionOptionID
    LEFT JOIN BusinessAddress bad on bad.BusinessID =  b.BusinessID and bad.AddressTypeLookupID = @MailingAddressType
    LEFT JOIN [Address] a on a.AddressID = bad.AddressID
    WHERE ((b.InsertedDTM BETWEEN @StartDate AND @EndDate) OR (b.InsertedDTM >= @StartDate AND @EndDate IS NULL) OR @StartDate IS NULL)
    AND (@BusinessName IS NULL OR (b.Name LIKE @BusinessName + '%'))
    AND (@SubscriptionPackage IS NULL OR (bso.BusinessSubscriptionOptionID = @SubscriptionPackage))
    AND 1 = CASE 
                WHEN (SELECT count(*) FROM @BusinessList) = 0 THEN 1 
                WHEN (SELECT count(*) FROM @BusinessList) > 0 AND (SELECT count(*) FROM @BusinessStatuses WHERE [value] = 0) = 1 AND b.BusinessID IN (SELECT BusinessID FROM @BusinessList) THEN 1
                WHEN (SELECT count(*) FROM @BusinessList) > 0 AND (SELECT count(*) FROM @BusinessStatuses WHERE [value] = 1) = 1 AND b.BusinessID NOT IN (SELECT BusinessID FROM @BusinessList) THEN 1
                ELSE 0 
            END
    ORDER BY [Name] ASC

    OFFSET (@pageNumber * @numberOfRecordsPerPage) ROWS
    FETCH NEXT @numberOfRecordsPerPage ROWS ONLY
    FOR JSON PATH, INCLUDE_NULL_VALUES

END
