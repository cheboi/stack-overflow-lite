CREATE OR ALTER PROCEDURE uspGetVotes(
@answer_id varchar(50)
)
AS
BEGIN
select votes from dbo.votesTable where answer_id=@answer_id
END