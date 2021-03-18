CREATE PROCEDURE [dbo].[sprGetQuoteRequestsForUser]
	@username VARCHAR(20)
AS
	SELECT
		Q.QuoteID AS Id,
		QI.ItemID AS ItemId,
		UQ.UserUN AS Username,
		Q.QuoteStatus AS [Status]
	From Quote Q
	INNER JOIN QuoteItems QI ON Q.QuoteID = QI.QuoteID
	INNER JOIN UserQuotes UQ ON Q.QuoteID = UQ.QuoteID
	WHERE UQ.UserUN = @username
RETURN
