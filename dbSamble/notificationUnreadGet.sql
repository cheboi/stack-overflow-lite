CREATE PROCEDURE [dbo].[NotificationsUnreadGet]
(
	@PersonToken	uniqueIdentifier,
    @BusinessID BIGINT = NULL
)
AS
BEGIN

    SET NOCOUNT ON;

    IF @BusinessID = 0 SET @BusinessID = NULL

    SELECT av.VisitToken, COUNT(1) AS NumberOfUnreadMessages
	FROM Notifications nt
	JOIN AppointmentVisit av on nt.AppointmentVisitID = av.AppointmentVisitID
    JOIN BusinessTimeblock btb ON btb.BusinessTimeblockID = av.BusinessTimeBlockID
	JOIN Business b ON b.BusinessID = btb.BusinessID
	WHERE nt.RecipientToken = @PersonToken AND nt.IsRead = 0 AND (b.BusinessID = @BusinessID OR @BusinessID IS NULL)
	GROUP BY av.VisitToken
	FOR JSON PATH, INCLUDE_NULL_VALUES

END