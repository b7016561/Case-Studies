CREATE PROCEDURE [dbo].[sprGetQuotes]
AS
	SELECT
		Q.QuoteID AS Id,
		UQ.UserUN AS Username,
		Q.QuoteCost AS TotalCost,
		Q.QuoteDescription AS [Description],
		QI.ItemID AS Id
	From Quote Q
	INNER JOIN QuoteItems QI ON Q.QuoteID = QI.QuoteID
	INNER JOIN UserQuotes UQ ON Q.QuoteID = UQ.QuoteID
RETURN
