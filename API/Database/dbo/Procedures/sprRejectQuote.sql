CREATE PROCEDURE [dbo].[sprRejectQuote]
	@quoteId INT
AS

	DELETE FROM [Quote]
	WHERE QuoteID = @quoteId

	DELETE FROM [UserQuotes]
	WHERE QuoteID = @quoteId

RETURN
